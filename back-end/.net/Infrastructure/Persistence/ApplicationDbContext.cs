using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    readonly string _dbPath;
    public ApplicationDbContext(string dbPath) : base()
    {
        _dbPath = dbPath;
    }

    public ApplicationDbContext() : this(Environment.GetEnvironmentVariable("DBPATH"))
    {

    }
   protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(builder =>
        {
            builder.HasKey(c => c.Id);

            builder.HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Post>(builder =>
        {
            builder.HasKey(p => p.Id);
        });
            

        base.OnModelCreating(modelBuilder);
        
}


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite($"Data Source={_dbPath}");

        base.OnConfiguring(optionsBuilder);
    }


    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }

}
