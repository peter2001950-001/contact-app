using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Utility;

namespace ContactApp.Backend.Data.Entities
{
    public class Contact : Entity, IRetirable
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Iban { get; set; }
        public bool IsRetired { get; private set; }
        public DateTime? RetiredOn { get; private set; }

        public void Retire()
        {
            if (IsRetired) return;

            IsRetired = true;
            RetiredOn = DateTime.Now;
        }

        public void Reactivate()
        {
            if (!IsRetired) return;

            IsRetired = false;
            RetiredOn = null;
        }
    }
}
