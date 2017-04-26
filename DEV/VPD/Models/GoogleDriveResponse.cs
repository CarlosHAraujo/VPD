using System.Collections.Generic;

namespace VPD.Models
{
    public class GoogleDriveResponse
    {
        public string NextPageToken { get; set; }
        public List<Documento> Documentos { get; set; }
    }
}