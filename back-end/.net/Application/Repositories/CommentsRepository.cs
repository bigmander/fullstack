using Domain;
using Infrastructure.Persistence;

namespace Application.Repositories;

public class CommentsRepository : Repository<Comment>
{
    public CommentsRepository(ApplicationDbContext context) : base(context)
    { }
}
