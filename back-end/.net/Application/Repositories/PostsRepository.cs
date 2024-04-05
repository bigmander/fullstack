using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories;

public class PostsRepository : Repository<Post>
{
    public PostsRepository(ApplicationDbContext context) : base(context)
    {
    }
}