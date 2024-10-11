using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories;

public class PostsRepository : Repository<Post>
{
    public PostsRepository(ApplicationDbContext context) : base(context)
    {


    }
    public override async Task<IEnumerable<Post>> GetAsync()
    {
        return await _entities
            .Include(p => p.Comments)
            .ToListAsync();
    }

    public override async Task<Post?> GetAsync(Guid id)
    {
        return await _entities.Include(p => p.Comments).FirstOrDefaultAsync(e => e.Id.Equals(id));
    }
}