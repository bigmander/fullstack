namespace Api.Helpers;

public static  class PaginationHelper
{
    public static (int from, int to) GetLimits(int page, int pageSize)
    {
        int from = (page > 0 ? page - 1 : 0) * pageSize,
        to = from + pageSize;

        return (from, to);
    }
}
