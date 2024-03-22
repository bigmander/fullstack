using Domain;

namespace Api.DTOs;

public class CommentDTO
{
    public Guid Id { get; private set; }
    public Guid PostId { get; private set; }
    public string Author { get; private set; }
    public string Title { get; private set; }
    public string Body { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? LastModification { get; private set; }
    public bool CanDelete { get; private set; }
    public CommentDTO(Comment c, string author)
    {
        Id = c.Id;
        Author = c.CreatedBy;
        Body = c.Body;
        Title = c.Title;
        PostId = c.Post.Id;
        CreatedAt = c.CreatedOn;
        LastModification = c.UpdatedOn;
        CanDelete = c.CreatedBy == author || c.Post.CreatedBy == author;
    }
}