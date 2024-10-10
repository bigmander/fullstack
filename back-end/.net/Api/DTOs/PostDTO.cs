using System.Text.Json.Serialization;
using Domain;

namespace Api.DTOs;

public class PostDTO
{


    public Guid Id { get; private set; }
    public string Author { get; private set; }
    public string Title { get; private set; }
    public string Body { get; private set; }

    public bool CanComment { get; private set; }
    public bool CanManage { get; private set; }

    private List<CommentDTO> _comments = new();
    public IReadOnlyList<CommentDTO> Comments => _comments.ToList();

    public DateTime CreatedAt { get; private set; }
    public DateTime? LastModification { get; private set; }
    public PostDTO(Post p, string author)
    {
        Id = p.Id;
        Author = p.CreatedBy;
        Body = p.Body;
        CanComment = p.CanComment;
        _comments = p.Comments.Select(c => new CommentDTO(c, author)).ToList();
        Title = p.Title;
        CanManage = p.CanManage(author);
        CreatedAt = p.CreatedOn;
        LastModification = p.UpdatedOn;
    }

    public PostDTO(PostDTO p, string author)
    {
        Id = p.Id;
        Author = p.Author;
        Title = p.Title;
        Body = p.Body;
        CanComment = p.CanComment;
        CanManage = p.Author == author;
        CreatedAt = p.CreatedAt;
        LastModification = p.LastModification;
        _comments = p.Comments.Select(c => new CommentDTO(c, author, p.Author)).ToList();
    }

    public void Update(string title, string body, bool canComment, string author)
    {
        Title = title;
        Body = body;
        CanComment = canComment;
        LastModification = DateTime.Now;
        _comments = Comments.Select(c => new CommentDTO(c, author, Author)).ToList();
    }


    [JsonConstructor]
    public PostDTO(
        Guid id,
        string author,
        string title,
        string body,
        bool canComment,
        bool canManage,
        DateTime createdAt,
        DateTime? lastModification,
        IReadOnlyList<CommentDTO> comments
    )
    {
        Id = id;
        Author = author;
        Title = title;
        Body = body;
        CanComment = canComment;
        CanManage = canManage;
        _comments = comments.ToList();
        CreatedAt = createdAt;
        LastModification = lastModification;
    }

    public PostDTO(string title, string body, bool canComment, string author)
    {
        Id = Guid.NewGuid();
        Author = author;
        Title = title;
        Body = body;
        CanComment = canComment;
        CanManage = true;
        _comments = new List<CommentDTO>();
        CreatedAt = DateTime.Now;
        LastModification = null;

    }
}
