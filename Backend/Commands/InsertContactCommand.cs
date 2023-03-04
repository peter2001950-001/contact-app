using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Controllers.Models;
using MediatR;

namespace ContactApp.Backend.Commands
{
    public class InsertContactCommand : IRequest<ContactResponse>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Iban { get; set; }
    }
}
