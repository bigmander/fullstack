namespace Domain;

public class Post : Entity, IManageableResource
{
    public string Title { get; private set; }
    public string Body { get; private set; }

    public bool CanComment { get; private set; }

    private readonly List<Comment> _comments = new();
    public virtual IReadOnlyList<Comment> Comments => _comments;

    public void Update(string author, string title, string body, bool canComment)
    {
        UpdatedBy = author;
        UpdatedOn = DateTime.Now;
        Title = title;
        Body = body;
        CanComment = canComment;
    }

    public void AddComment(string name, string body, string author)
    {
        var comment = new Comment(this, name, body, author);

        _comments.Add(comment);
    }
    public bool CanManage(string author)
    {
        return !string.IsNullOrEmpty(author) && author == CreatedBy;
    }
    public Post(string title, string body, bool canComment, string createdBy) : base(Guid.NewGuid(), createdBy)
    {
        Title = title;
        Body = body;
        CanComment = canComment;
    }

    public Post(string title, string body, bool canComment, string createdBy, IEnumerable<Comment> comments) : 
        this(title, body, canComment, createdBy)
    {
        _comments.AddRange(comments);
    } 
}
