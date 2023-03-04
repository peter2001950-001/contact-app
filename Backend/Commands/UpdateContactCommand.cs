using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Utility;
using MediatR;

namespace ContactApp.Backend.Commands
{
    public class UpdateContactCommand: IRequest<ContactResponse>, IIdentifiable
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Iban { get; set; }
    }
}
