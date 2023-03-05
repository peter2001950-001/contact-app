using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Utility;
using MediatR;

namespace ContactApp.Backend.Commands
{
    public class DeleteContactsCommand : IRequest
    {
        public DeleteContactsCommand(int lookBackDays)
        {
            LookBackDays = lookBackDays;
        }
        public int LookBackDays { get; set; }
    }
}
