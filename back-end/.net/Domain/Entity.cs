namespace Domain;
public class Entity
{
    public Guid Id { get; protected set; }
    public DateTime CreatedOn { get; protected set; }
    public DateTime? UpdatedOn { get; protected set; }
    public string CreatedBy { get; protected set; }
    public string? UpdatedBy { get; protected set; }

    public Entity(Guid id, string createdBy)
    {
        Id = id;
        CreatedOn = DateTime.Now;
        CreatedBy = createdBy;
        UpdatedOn = null;
        UpdatedBy = string.Empty;
    }
}

