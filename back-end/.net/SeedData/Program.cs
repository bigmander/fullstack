using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Program;

static class Program
{
    static void Main(string[] args)
    {
        try
        {

            using (var db = new ApplicationDbContext())
            {
                db.Database.EnsureDeleted();

                db.Database.EnsureCreated();


                string basePath = args[0];

                string postsQuery = File.ReadAllText(
                    Path.Combine(basePath, "mock-posts.sql")
                );
                string commentsQuery = File.ReadAllText(
                    Path.Combine(basePath, "mock-comments.sql")
                );

                db.Database.ExecuteSqlRaw(postsQuery);

                db.Database.ExecuteSqlRaw(commentsQuery);
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
        }
    }


}
