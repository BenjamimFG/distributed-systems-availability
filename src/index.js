function factorial(n) {
  if (n < 0) throw new Error("Negative factorial");
  if (n == 0 || n == 1) return 1;

  return n * factorial(n - 1);
}

function combination(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function availability(n, p, k) {
  let result = 0;

  for (let i = n; i >= k; --i) {
    result += combination(n, i) * (Math.pow(p, i) * Math.pow(1 - p, n - i));
  }

  return result;
}

const variables = {
  n: 1,
  k: 1,
};

const pArray = [];

for (let i = 0; i <= 1; i += 0.05) {
  i = Number.parseFloat(i.toFixed(2));
  pArray.push(i);
}

function update(event, variable) {
  const value = Number.parseInt(event.target.value);
  if (value < 1 || value > 100) {
    alert("Por favor insira um valor de 1 a 100");
    document.querySelector(`#${variable}-number`).value = variables[variable];
    document.querySelector(`#${variable}-range`).value = variables[variable];
    throw new Error("Invalid value for " + variable);
  }

  variables[variable] = value;
  document.querySelector(`#${variable}-number`).value = value;
  document.querySelector(`#${variable}-range`).value = value;
}

function calculateResArray(pArray) {
  const resArray = [];

  for (let p of pArray) {
    resArray.push(availability(variables["n"], p, variables["k"]));
  }

  return resArray;
}

function plot() {
  console.log(variables);
  if (variables["k"] > variables["n"]) {
    alert("Valor de K não pode ser maior que o valor de N");
    throw new Error("K cannot be bigger than N");
  }
  const resArray = calculateResArray(pArray);

  const trace = {
    x: pArray,
    y: resArray,
    type: "scatter",
  };

  const layout = {
    title: `Disponibilidade quando N=${variables["n"]} e K=${variables["k"]}`,
    xaxis: {
      title: "Probabilidade (p)",
    },
    yaxis: {
      title: "Disponibilidade",
    },
  };

  const data = [trace];
  Plotly.newPlot("chart", data, layout);
}

plot();
