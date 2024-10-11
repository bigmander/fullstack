using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories;

public class CommentsRepository : Repository<Comment>
{
    public CommentsRepository(ApplicationDbContext context) : base(context)
    { }

    public override async Task<Comment?> GetAsync(Guid id)
    {
        return await _entities.Include( c => c.Post).FirstOrDefaultAsync(c => c.Id == id);
    }
}
