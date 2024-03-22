using Api.Helpers;

namespace Api.Extensions;
public class Pagination<T>
{
    public IEnumerable<T> Items { get; set; }
    public int Total { get; set; }
    public int CurrentPage { get; set; }
}

public static class PaginationExtension
{
    public static Pagination<T> Page<T>(this IEnumerable<T> list, int page, int pageSize) 
    {
        (int from, int to) = PaginationHelper.GetLimits(page, pageSize);

        return new Pagination<T>
        {
            Items = list.Take(to).Skip(from),
            Total = list.Count(),
            CurrentPage = page
        };
    }
}