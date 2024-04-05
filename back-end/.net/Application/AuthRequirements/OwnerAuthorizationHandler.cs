using Domain;
using Microsoft.AspNetCore.Authorization;

namespace Application.AuthRequirements;

public class OwnerAuthorizationHandler : 
    AuthorizationHandler<OwnerRequirement, IManageableResource>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OwnerRequirement requirement, IManageableResource resource)
    {
        return Task.CompletedTask;
    }
}
