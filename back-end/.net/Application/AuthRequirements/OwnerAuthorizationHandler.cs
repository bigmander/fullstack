using Domain;
using Microsoft.AspNetCore.Authorization;

namespace Application.AuthRequirements;

public class OwnerAuthorizationHandler : 
    AuthorizationHandler<OwnerRequirement, IManageableResource>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OwnerRequirement requirement, IManageableResource resource)
    {

        if (resource == null)
            return Task.CompletedTask;

        string author = context.User?.Identity?.Name;
        if (resource.IsAuthToManage(author))
        {
            
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
