using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AZVAdmin.Models
{
    [Table("PushMessage")]
    public class PushMessage
    {

        [Key]
        public int Id { get; set; }

        [Display(Name = "Message")]
        public string Message { get; set; }

        [Display(Name = "Url")]
        public string Url { get; set; }

        [Display(Name = "Segment")]
        public string Segment { get; set; }

    }
}