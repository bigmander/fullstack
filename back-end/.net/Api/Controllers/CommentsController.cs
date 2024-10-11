using Api.DTOs;
using Application.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        readonly CommentsRepository _commentsRepository;

        public CommentsController(
            CommentsRepository commentsRepository
        ) {
            _commentsRepository = commentsRepository;    
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> DeleteCommentById(Guid id)
        {
            var comment = await _commentsRepository.GetAsync(id);

            if (comment == null) {
                return NotFound();
            }

            var dto = new CommentDTO(comment, User.Identity.Name);
            if (!dto.CanDelete) {
                return Forbid();
            }

            await _commentsRepository.DeleteAsync(comment);
            await _commentsRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
