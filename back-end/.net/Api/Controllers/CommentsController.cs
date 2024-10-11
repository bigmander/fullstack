using Api.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Text.Json;
using IOFile = System.IO.File;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        readonly IEnumerable<PostDTO>? _posts;

        public CommentsController(
        )
        {
            string path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Assets\data.json");

            string json = IOFile.ReadAllText(path);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            _posts = JsonSerializer.Deserialize<IEnumerable<PostDTO>>(json, options);
        }
        IEnumerable<PostDTO> PreparePosts(string author)
        {
            return _posts
                .Select(p => new PostDTO(p, author));
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> DeleteCommentById(Guid id)
        {
            var posts = PreparePosts(User.Identity.Name);

            var comment = posts.SelectMany(p => p.Comments)
                .FirstOrDefault(c => c.Id == id);

            if (comment == null) {
                return NotFound();
            }

            if (!comment.CanDelete) {
                return Forbid();
            }

            return NoContent();
        }
    }
}
