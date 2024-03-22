using Domain;
using Infrastructure.Persistence;

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


}
