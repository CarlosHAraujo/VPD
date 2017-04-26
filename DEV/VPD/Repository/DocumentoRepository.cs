using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using VPD.Models;
using System.Linq;
using System.Web.Hosting;
using System;
using System.Net;

namespace VPD.Repository
{
    internal class ServiceAccount
    {
        public string Client_email { get; set; }
        public string Private_key { get; set; }
    }

    public class DocumentoRepository
    {
        private readonly string _configFile = ConfigurationManager.AppSettings["configFile"];
        private readonly string[] _scopes = { DriveService.Scope.DriveReadonly };
        private readonly string _applicationName = ConfigurationManager.AppSettings["appName"];

        public GoogleDriveResponse List(string pageToken, int itensPerPage)
        {
            ServiceAccountCredential credential;

            var path = HostingEnvironment.MapPath("~") + _configFile;
            using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                ServiceAccount json;
                using (StreamReader streamReader = new StreamReader(stream))
                {
                    json = JsonConvert.DeserializeObject<ServiceAccount>(streamReader.ReadToEnd());
                }

                credential = new ServiceAccountCredential(new ServiceAccountCredential.Initializer(json.Client_email) { Scopes = _scopes }.FromPrivateKey(json.Private_key));
            }

            // Create Drive API service.
            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = _applicationName,
            });

            // Define parameters of request.
            FilesResource.ListRequest listRequest = service.Files.List();
            if(itensPerPage > 0)
            {
                listRequest.PageSize = itensPerPage;
            }
            else
            {
                listRequest.PageSize = 10;
            }
            if(!String.IsNullOrEmpty(pageToken))
            {
                listRequest.PageToken = pageToken;
            }
            listRequest.Fields = "nextPageToken, files(id, name, thumbnailLink, fileExtension, folderColorRgb, fullFileExtension, iconLink, mimeType, size, owners, webViewLink, webContentLink)";

            //Avoid returning trashed itens
            listRequest.Q = "trashed=false";

            // List files.
            var result = listRequest.Execute();
            List<Google.Apis.Drive.v3.Data.File> files = result.Files.ToList();
            return new GoogleDriveResponse
            {
                NextPageToken = result.NextPageToken,
                Documentos = (from file in files
                              select new Documento
                              {
                                  Id = file.Id,
                                  Name = file.Name,
                                  Extension = file.FileExtension,
                                  FullExtension = file.FullFileExtension,
                                  IconLink = file.IconLink.Replace("/16", "/256"),
                                  MimeType = file.MimeType,
                                  Owner = file.Owners.Any() ? file.Owners[0].DisplayName : "",
                                  Size = file.Size,
                                  Thumbnail = GetImage(file.ThumbnailLink),
                                  ViewLink = file.WebViewLink,
                                  DownloadLink = file.WebContentLink
                              }).ToList()
            };
        }

        private string GetImage(string url)
        {
            if(String.IsNullOrEmpty(url))
            {
                return url;
            }

            using (var client = new WebClient())
            {
                return String.Format("data:image/png;base64, {0}", Convert.ToBase64String(client.DownloadData(url)));
            }
        }
    }
}