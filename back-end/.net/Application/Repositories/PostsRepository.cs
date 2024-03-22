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
            .OrderByDescending(p => p.CreatedOn)
            .Include(p => p.Comments)
            .ToListAsync();
    }
    public override async Task InsertAsync(Post entity)
    {
        await base.InsertAsync(entity);

        await SaveChangesAsync();
    }

    public override async Task DeleteAsync(Post entity)
    {
        await base.DeleteAsync(entity);

        await SaveChangesAsync();
    }

    public override async Task UpdateAsync(Post entity)
    {
        await base.UpdateAsync(entity);

        await SaveChangesAsync();
    }

    
    public async Task<IEnumerable<Post>> QueryAll(string search)
    {
        return await _entities
                .Include(p => p.Comments)
                .Where(p =>
                    string.IsNullOrEmpty(search) ||
                    p.Body.Contains(search) ||
                    p.Title.Contains(search)
                )
                 .OrderByDescending(p => p.UpdatedOn)
                .ToListAsync();
    }
}