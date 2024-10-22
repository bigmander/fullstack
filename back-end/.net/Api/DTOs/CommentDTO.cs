using Domain;
using System.Text.Json.Serialization;

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
    [JsonConstructor]
    public CommentDTO(Guid id, string title, string body, Guid postId, string author, DateTime? lastModification, DateTime createdAt, bool canDelete)
    {
        Id = id;
        Author = author;
        Body = body;
        Title = title;
        PostId = postId;
        CreatedAt = createdAt;
        LastModification = lastModification;
        CanDelete = canDelete;
    }

    public CommentDTO(
            string title, string body, Guid postId, string author, string postAuthor
        )
    {
        Id = Guid.NewGuid();
        Title = title;
        Body = body;
        PostId = postId;
        Author = author;
        LastModification = null;
        CreatedAt = DateTime.Now;
        CanDelete = postAuthor == author;
    }

    public CommentDTO(CommentDTO c, string author, string postAuthor)
    {
        Id = c.Id;
        Title = c.Title;
        Body = c.Body;
        PostId = c.PostId;
        Author = c.Author;
        LastModification = c.LastModification;
        CreatedAt = c.CreatedAt;
        CanDelete = c.Author == author || postAuthor == author;
    }
}