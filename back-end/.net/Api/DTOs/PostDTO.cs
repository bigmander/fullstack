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

    private List<CommentDTO> _comments = new ();
    public IReadOnlyList<CommentDTO> Comments => _comments.ToList();

    public DateTime CreatedAt { get; private set; }
    public DateTime? LastModification { get; private set;}
    public PostDTO(Post p, string author)
    {
        Id = p.Id;
        Author = p.CreatedBy;
        Body = p.Body;
        CanComment = p.CanComment;
        _comments = p.Comments.Select(c => new CommentDTO(c, author)).ToList();
        Title = p.Title;
        CanManage = p.CreatedBy == author;
        CreatedAt = p.CreatedOn;
        LastModification = p.UpdatedOn;
    }
}
