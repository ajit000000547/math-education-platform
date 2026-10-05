const mathEducationData = {
  chapters: [
    { id: 1, number: 1, title: 'Number System', level: 'level-1', description: 'Natural, whole, integers, rational and real numbers with number properties.' },
    { id: 2, number: 2, title: 'Fractions & Decimals', level: 'level-1', description: 'Operations with fractions, decimal conversion, percentages and simplification.' },
    { id: 3, number: 3, title: 'Linear Equations', level: 'level-1', description: 'One variable and two variable equations solved graphically and algebraically.' },
    { id: 4, number: 4, title: 'Algebraic Expressions', level: 'level-1', description: 'Coefficients, terms, identities, factorization, and simplification techniques.' },
    { id: 5, number: 5, title: 'Geometry', level: 'level-2', description: 'Lines, angles, triangles, circles, polygons and relation between geometric shapes.' },
    { id: 6, number: 6, title: 'Mensuration', level: 'level-2', description: 'Perimeter, area, volume and surface area of standard 2D and 3D figures.' },
    { id: 7, number: 7, title: 'Trigonometry', level: 'level-2', description: 'Sine, cosine, tangent, identities, and practical real-world angle applications.' },
    { id: 8, number: 8, title: 'Coordinate Geometry', level: 'level-2', description: 'Cartesian plane, distance formula, section formula, lines and slope concepts.' },
    { id: 9, number: 9, title: 'Statistics', level: 'level-2', description: 'Mean, median, mode, bar graphs, grouped data and interpretation methods.' },
    { id: 10, number: 10, title: 'Probability', level: 'level-3', description: 'Sample space, favorable outcomes, simple events, and conditional probability basics.' },
    { id: 11, number: 11, title: 'Quadratic Equations', level: 'level-3', description: 'Roots, discriminant, factoring and solving equations through formula methods.' },
    { id: 12, number: 12, title: 'Calculus', level: 'level-3', description: 'Limits, derivatives, basic differentiation and integration concepts.' }
  ],
  formulas: {
    Algebra: [
      '(a+b)^2 = a^2 + 2ab + b^2',
      '(a-b)^2 = a^2 - 2ab + b^2',
      'a^2 - b^2 = (a-b)(a+b)',
      'x = [-b ± √(b^2 - 4ac)] / 2a'
    ],
    Geometry: [
      'Area of rectangle = l × b',
      'Area of triangle = 1/2 × b × h',
      'Area of circle = πr^2',
      'Volume of cube = a^3'
    ],
    Trigonometry: [
      'sin θ = opposite / hypotenuse',
      'cos θ = adjacent / hypotenuse',
      'tan θ = opposite / adjacent',
      'sin^2θ + cos^2θ = 1'
    ],
    Statistics: [
      'Mean = sum of values / total values',
      'Median = middle value in sorted data',
      'Mode = most repeated value',
      'Range = max - min'
    ]
  },
  notes: [
    { title: 'Triangle Rule', content: 'Sum of interior angles in a triangle is 180°, and area is 1/2 × base × height.' },
    { title: 'Quadratic Formula', content: 'x = [-b ± √(b² - 4ac)] / 2a, useful when factorization is not direct.' },
    { title: 'Circle Basics', content: 'Area = πr², circumference = 2πr, diameter = 2r.' },
    { title: 'Probability', content: 'P(E) = favorable outcomes / total outcomes. Count carefully before making a decision.' },
    { title: 'Statistics', content: 'Mean = sum / count; median is middle value; mode is most repeated value.' },
    { title: 'Derivative Rule', content: 'If y = xⁿ, then dy/dx = n·xⁿ⁻¹. Differentiation is the rate of change.' }
  ],
  practiceSets: [
    {
      id: 'beginner',
      title: 'Beginner Practice',
      description: 'Core arithmetic and algebra basics',
      questions: [
        { id: 1, question: 'Simplify: 3/4 + 2/5', options: ['11/20', '17/20', '9/10', '13/20'], answer: '1' },
        { id: 2, question: 'Convert 0.75 into fraction', options: ['3/4', '1/2', '7/10', '5/8'], answer: '0' },
        { id: 3, question: 'Solve: 4x - 7 = 17', options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'], answer: '1' },
        { id: 4, question: 'Find 15% of 240', options: ['30', '36', '40', '45'], answer: '1' }
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate Practice',
      description: 'Factorization, geometry, and equations',
      questions: [
        { id: 1, question: 'Factorize x² - 9', options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)^2', '(x+3)^2'], answer: '0' },
        { id: 2, question: 'Find area of triangle with base 12 and height 8', options: ['48', '96', '24', '40'], answer: '0' },
        { id: 3, question: 'Solve 2x + y = 10, x - y = 2', options: ['x=4, y=2', 'x=3, y=1', 'x=5, y=3', 'x=2, y=4'], answer: '0' },
        { id: 4, question: 'Find sin 30° + cos 60°', options: ['0', '1', '2', '0.5'], answer: '1' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Practice',
      description: 'Quadratic equations, differentiation, probability',
      questions: [
        { id: 1, question: 'Solve x² - 5x + 6 = 0', options: ['x = 2 or 3', 'x = 1 or 6', 'x = -2 or -3', 'x = 5 or 1'], answer: '0' },
        { id: 2, question: 'Differentiate x³ + 2x² - 5', options: ['3x² + 4x', '3x² + 2x', 'x² + 4x', '3x + 4'], answer: '0' },
        { id: 3, question: 'Probability of rolling an even number on a die', options: ['1/6', '1/3', '1/2', '2/3'], answer: '2' },
        { id: 4, question: 'Find mean of 10, 15, 20, 25, 30', options: ['18', '20', '22', '24'], answer: '1' }
      ]
    }
  ],
  tests: [
    { id: 'test-1', title: 'Foundation Test', duration: 15, questions: [
      { id: 1, question: 'Simplify 2/3 + 1/6', options: ['1/2', '5/6', '3/4', '7/6'], answer: '1' },
      { id: 2, question: 'What is 20% of 80?', options: ['12', '16', '18', '20'], answer: '1' },
      { id: 3, question: 'Solve 5x = 35', options: ['x=5', 'x=6', 'x=7', 'x=8'], answer: '2' },
      { id: 4, question: 'Area of a square with side 4 is', options: ['8', '12', '16', '20'], answer: '2' }
    ]},
    { id: 'test-2', title: 'Algebra Sprint', duration: 20, questions: [
      { id: 1, question: 'Expand (x+3)^2', options: ['x² + 6x + 9', 'x² + 3x + 9', 'x² + 9', 'x² + 6x'], answer: '0' },
      { id: 2, question: 'Solve x² - 4 = 0', options: ['x=2', 'x=-2', 'x=±2', 'x=0'], answer: '2' },
      { id: 3, question: 'If y=3x+2, then y when x=4', options: ['10', '12', '14', '16'], answer: '2' },
      { id: 4, question: 'Factor x² - 9', options: ['(x-3)(x+3)', '(x-3)^2', '(x+3)^2', '(x+9)(x-1)'], answer: '0' }
    ]},
    { id: 'test-3', title: 'Geometry Challenge', duration: 18, questions: [
      { id: 1, question: 'Perimeter of a rectangle 5 by 3', options: ['8', '12', '15', '16'], answer: '3' },
      { id: 2, question: 'Area of triangle base 10 height 6', options: ['30', '60', '20', '50'], answer: '0' },
      { id: 3, question: 'Circle radius 7, area approx', options: ['22', '44', '154', '308'], answer: '2' },
      { id: 4, question: 'Sum of angles of a triangle', options: ['90°', '180°', '270°', '360°'], answer: '1' }
    ]},
    { id: 'test-4', title: 'Probability & Stats', duration: 18, questions: [
      { id: 1, question: 'Probability of heads in a coin toss', options: ['1/4', '1/2', '3/4', '1'], answer: '1' },
      { id: 2, question: 'Mean of 2, 4, 6', options: ['3', '4', '5', '6'], answer: '1' },
      { id: 3, question: 'Mode of 2,2,3,4,4,4', options: ['2', '3', '4', '5'], answer: '2' },
      { id: 4, question: 'Probability of rolling a 6 on a die', options: ['1/3', '1/6', '1/2', '2/3'], answer: '1' }
    ]}
  ]
};
