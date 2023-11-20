using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Expense_Management.Controllers
{
    
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        [HttpPost]
        [Route("UploadFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UploadFile(IFormFile file, string filename, CancellationToken cancellationToken)
        {
            var result = await WriteFile(file, filename);
            return Ok(result);
        }

        private async Task<string> WriteFile(IFormFile file, string filename)
        {
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename + extension);

                if (!Directory.Exists(Path.GetDirectoryName(exactpath)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(exactpath));
                }

                using (var stream = new FileStream(exactpath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return filename;
            }
            catch (Exception ex)
            {
                // Handle the exception
                return null;
            }
        }

        [HttpGet]
        [Route("DownloadFile/{filename}")]
        public async Task<IActionResult> DownloadFile(string filename)
        {
            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");

            // Find the file in the directory
            var filePath = Directory.GetFiles(directoryPath, $"{filename}.*").FirstOrDefault();
            if (filePath == null)
            {
                return NotFound();
            }

            // Get the content type and return the file
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            var stream = System.IO.File.OpenRead(filePath);
            return File(stream, contenttype, Path.GetFileName(filePath));
        }

        [HttpDelete]
        [Route("DeleteFile/{filename}")]
        public IActionResult DeleteFile(string filename)
        {
            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");

            // Find the file in the directory
            var filePath = Directory.GetFiles(directoryPath, $"{filename}.*").FirstOrDefault();
            if (filePath == null)
            {
                return NotFound();
            }

            // Delete the file
            System.IO.File.Delete(filePath);
            return Ok();
        }

        [HttpGet]
        [Route("GetFile/{filename}")]
        public async Task<IActionResult> GetFile(string filename)
        {
            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");

            // Find the file in the directory
            var filePath = Directory.GetFiles(directoryPath, $"{filename}.*").FirstOrDefault();
            if (filePath == null)
            {
                return NotFound();
            }

            // Read the file data
            var fileData = await System.IO.File.ReadAllBytesAsync(filePath);

            // Return the image data as a base64 encoded string
            return Ok(new { data = Convert.ToBase64String(fileData) });
        }
    }
}
