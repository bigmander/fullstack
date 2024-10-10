using Domain;
using Infrastructure.Persistence;

namespace Application.Repositories;

public class PostsRepository : Repository<Post>
{
    public PostsRepository(ApplicationDbContext context) : base(context)
    {
    }
}