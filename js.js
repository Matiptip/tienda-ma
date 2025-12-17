class Producto {
  constructor({
    id,
    nombre,
    descripcion,
    precio,
    unidad,
    peso,
    categoria,
    variantes = [],
    ingredientes = [],
    imageUrl = "" // holder para imagen
  }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.unidad = unidad;
    this.peso = peso;
    this.categoria = categoria;
    this.variantes = variantes;
    this.ingredientes = ingredientes;
    this.imageUrl = imageUrl;
  }
}

const productos = [
  new Producto({
    id: "budin-ingles-350",
    nombre: "Budín inglés",
    descripcion: "Budín inglés glaseado",
    precio: 5500,
    unidad: "c/u",
    peso: "350 grs",
    categoria: "Budines",
    variantes: [
      "Frutas abrillantadas",
      "Chips de chocolate"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "mayonesa-de-ave",
    nombre: "Mayonesa de ave",
    descripcion: "Porción mediana, presentada en bandeja",
    precio: 5000,
    unidad: "por bandeja",
    peso: "Porción mediana",
    categoria: "Platos salados",
    ingredientes: [
      "Pollo",
      "Papa",
      "Zanahoria",
      "Arvejas",
      "Mayonesa"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "budines-saborizados-250",
    nombre: "Budines saborizados",
    descripcion: "Budines individuales",
    precio: 4500,
    unidad: "c/u",
    peso: "250 grs",
    categoria: "Budines",
    variantes: [
      "Vainilla",
      "Chocolate",
      "Marmolado",
      "Limón",
      "Banana"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "pan-dulce-individual",
    nombre: "Pan dulce individual",
    descripcion: "Pan dulce individual con mix de frutas o chips",
    precio: 3000,
    unidad: "c/u",
    peso: "Individual",
    categoria: "Pan dulce",
    variantes: [
      "Mix de frutas abrillantadas y secas",
      "Chips de chocolate"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "pan-dulce-400",
    nombre: "Pan dulce",
    descripcion: "Pan dulce tradicional",
    precio: 6000,
    unidad: "c/u",
    peso: "400 grs",
    categoria: "Pan dulce",
    variantes: [
      "Mix de frutas abrillantadas y secas",
      "Chips de chocolate"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "empanada-carne",
    nombre: "Empanada de carne suave",
    descripcion: "Empanada de carne tradicional",
    precio: 2500,
    unidad: "c/u",
    peso: "",
    categoria: "Empanadas",
    imageUrl: ""
  })
];
