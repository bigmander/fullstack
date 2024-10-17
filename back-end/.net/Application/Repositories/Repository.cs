using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories;

public class Repository<TEntity> 
    where TEntity : Entity
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<TEntity> _entities;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
        
        _entities = _context.Set<TEntity>();
    }

    public virtual async Task<bool> ExistsAsync(Guid id)
    {
        return await _entities.AnyAsync(e=> e.Id == id);
    }

    public virtual async Task<IEnumerable<TEntity>> GetAsync()
    {
        return await _entities.ToListAsync();
    }

    public virtual async Task<TEntity?> GetAsync(Guid id) 
    {
        return await _entities.FirstOrDefaultAsync( e => e.Id.Equals(id));
    }

    public virtual Task InsertAsync(TEntity entity)
    {
        _entities.Add(entity);

        return Task.CompletedTask;
    }

    public virtual Task UpdateAsync(TEntity entity)
    {
        _entities.Attach(entity);
        return Task.CompletedTask;
    }

    public virtual Task DeleteAsync(TEntity entity)
    {

        _entities.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
