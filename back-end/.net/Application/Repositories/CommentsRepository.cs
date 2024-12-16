using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories;

public class CommentsRepository : Repository<Comment>
{
    public CommentsRepository(ApplicationDbContext context) : base(context)
    { }
    public override async Task InsertAsync(Comment entity)
    {
        await base.InsertAsync(entity);

        await SaveChangesAsync();
    }

    public override async Task DeleteAsync(Comment entity)
    {
        await base.DeleteAsync(entity);

        await SaveChangesAsync();
    }

    public override async Task<Comment?> GetAsync(Guid id)
    {
        var comment = await _entities
            .Include(c => c.Post)
            .FirstOrDefaultAsync(e => e.Id.Equals(id));

        return comment;
    }

}
