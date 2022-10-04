---

- Definir o principio de `Inversão de dependências` do S.O.L.I.D como `Entidades de alto nível não devem depender de entidades de baixo nível. Ambas devem depender de abstrações.`

---


>> Avalie as afirmações abaixo sobre o Princípio de Inversão de Dependências (DIP):  
  
I - O DIP busca acoplar as classes para que o funcionamento delas estejam sempre em sincronia.  
II - Aplicar a Inversão de Dependências permite que as classes sejam reaproveitadas com implementações diferentes.  
III - Entidades de alto nível não devem depender de entidades de baixo nível. Ambos devem depender de abstrações.  
IV - Inverter as dependências significa que a classe dependente necessita saber os detalhes de implementação do serviço fornecido a ela.  
  
Quais afirmações são verdadeiras? <<

( ) I e II. {{ Alternativa incorreta. I - Incorreto! O DIP busca reduzir o acomplamento entre as classes para que elas se tornem independentes umas das outras. II - Correto! Aplicar o DIP no projeto torna as classes desacopladas e de fácil reutilização para diferentes implementações. }}
( ) I e III. {{ Alternativa incorreta. I - Incorreto! O DIP busca reduzir o acomplamento entre as classes para que elas se tornem independentes umas das outras. III - Correto! O DIP declara que: "Entidades de alto nível não devem depender de entidades de baixo nível. Ambos devem depender de abstrações.". }}
(x) II e III.
( ) III e IV. {{ Alternativa incorreta. III - Correto! O DIP declara que: "Entidades de alto nível não devem depender de entidades de baixo nível. Ambos devem depender de abstrações.". IV - Incorreto! No DIP, classes que dependem de serviços não devem saber como estes foram implementados, elas apenas o usam. }}
( ) II e IV.  {{ Alternativa incorreta. II - Correto! Aplicar o DIP no projeto torna as classes desacopladas e de fácil reutilização para diferentes implementações. IV - Incorreto! No DIP, classes que dependem de serviços não devem saber como estes foram implementados, elas apenas a usam. }}