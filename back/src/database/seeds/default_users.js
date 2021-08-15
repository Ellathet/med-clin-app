exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function () {
      // Inserts seed entries
      return knex('people').insert([
      { 
        NAME: 'Tulio Medeiros Borges', 
        FUNCTION: 'Neurocirurgia', 
        TYPE: "M",
        EMAIL: "tulio@gmail.com",
        CPF: "148.148.848-36",
        RG: "18.198.191-9",
        BIRTH: new Date(2003, 04, 10),
        PASSWORD: "$argon2i$v=19$m=4096,t=3,p=1$Vtfof/3tba7vEJ4uKrNv4w$vzh7Q5DQre8auMHNpuIwJjyPR+zMELYjx15mZnEiKgQ",
      },
      { 
        NAME: 'Gabriel Toledo', 
        FUNCTION: 'Cirurgia torácica', 
        TYPE: "M",
        EMAIL: "gabriel@gmail.com",
        CPF: "154.144.888-25",
        RG: "22.198.145-9",
        BIRTH: new Date(2003, 03, 01),
        PASSWORD: "$argon2i$v=19$m=4096,t=3,p=1$Vtfof/3tba7vEJ4uKrNv4w$vzh7Q5DQre8auMHNpuIwJjyPR+zMELYjx15mZnEiKgQ",
      },
      { 
        NAME: 'Micael Icaro Pinto Santana', 
        FUNCTION: 'Infectologia', 
        TYPE: "M",
        EMAIL: "micael@gmail.com",
        CPF: "124.124.885-35",
        RG: "21.188.122-1",
        BIRTH: new Date(2003, 05, 22),
        PASSWORD: "$argon2i$v=19$m=4096,t=3,p=1$Vtfof/3tba7vEJ4uKrNv4w$vzh7Q5DQre8auMHNpuIwJjyPR+zMELYjx15mZnEiKgQ",
      },
      { 
        NAME: 'Thiago Rhails', 
        TYPE: "P",
        EMAIL: "thiago@gmail.com",
        CPF: "242.111.255-25",
        RG: "31.181.125-1",
        BIRTH: new Date(2003, 04, 01),
        PASSWORD: "$argon2i$v=19$m=4096,t=3,p=1$Vtfof/3tba7vEJ4uKrNv4w$vzh7Q5DQre8auMHNpuIwJjyPR+zMELYjx15mZnEiKgQ",
      },
      ]);
    });
};
