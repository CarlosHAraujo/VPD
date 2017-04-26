namespace VPD.Models
{
    public class Documento
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
        public string FullExtension { get; set; }
        public string IconLink { get; set; }
        public string MimeType { get; set; }
        public string Owner { get; set; }
        public long? Size { get; set; }
        public string ViewLink { get; internal set; }
        public string DownloadLink { get; internal set; }
        public object Thumbnail { get; internal set; }
    }
}