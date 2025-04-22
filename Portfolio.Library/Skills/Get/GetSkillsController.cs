using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Skills.Get;

[ApiController]
[Route("api/skills")]
public class GetSkillsController : ControllerBase
{
    private readonly IMediator _mediator;

    public GetSkillsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _mediator.Send(new GetSkillsQuery());
        return Ok(result);
    }
}