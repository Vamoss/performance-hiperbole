# Hiperbólica

Hiperbólica é uma performance virtual que será projetada no Museu Nacional da República de Brasília.

No dia 9 de Setembro, começa o #.ART – Encontro Internacional de Arte e Tecnologia, no Museu Nacional da República, em Brasília. O evento busca estabelecer uma visão geral do estado da arte, da pesquisa e das tecnologias sociais voltadas para a sustentabilidade, as artes e a cultura digital. O NANO estará presente em mais esta edição como parte da programação do emMeio#14, organizado pelo MediaLab da UnB – Universidade de Brasília.

Estruturada sobre os eixos arte, hibridação, biotelemática e transculturalidade, a participação do NANO acontecerá no formato de uma performance onde exploramos as possibilidades de conectividade e o potencial telemático de possíveis interconexões em tempo real. O tema proposto é a Hipérbole, ou Hiper-Parábola, e sua poética de desencontros, num exercício de criação de meios de interação via internet, para reduzir as distâncias entre agentes, remotos ou locais. Esta obra é uma versão condensada da experiência de laboratório aberto, realizada nos eventos Hiperorgânicos. 
 
## Como funciona

- A performance acontece a partir de imagens geradas por sketches. 
 Os sketches são experimentos criados a partir da manipulação de códigos de computador. 
- As imagens geradas pelos sketches serão incorporadas a uma obra coletiva que será projetada durante a exposição no Museu Nacional da República. 
- Alguns sketches permitem interação, e  interferências nas imagens que serão projetadas.

## Arquitetura da coisa

Os sketches mudam automaticamente num determinando momento. O sincronismo é resultado da hora fornecida pelo serviço [NTP JS](https://use.ntpjs.org/).
O software sabe que cada fração de tempo deve apresentar um determinado sketch. Não tem hora de início ou de fim, ao acessar a aplicação, o software apresentarão o sketch correspondente aquela hora específica.

Este sincronismo baseado na hora NTP permite que servidor e computadores utilizados pelas pessoas de suas casas e do evento saibam em qual sketch estar naquele momento.

Os sketches que permitem interação multi-usuário utilizam o protocolo de comunicação MQTT. Que viabiliza a troca de mensagens entre todos os participantes.

Links úteis:
- [URL do servidor](https://vamoss.github.io/performance-hiperbole/render.html): Utilizada pelo servidor que fará a projeção.
- [URL do participante](https://vamoss.github.io/performance-hiperbole/client.html): utilizadas pelos participantes do laboratório NANO.
- [URL do simulador](https://vamoss.github.io/performance-hiperbole/simulator.html): apresenta uma janela do servidor e 3 dos participantes. Útil para observar como funcionam o sincronismo de sketches e comunicação entre participantes .


 

## Exemplos de Sketches

Lista de modelos para se inspirar e contribuir com sua criação:

1. p5js com interatividade multi-usuário (MQTT)
   - [Hiperbolas](https://vamoss.github.io/performance-hiperbole/sketches/001/)
   - [Código-fonte](https://github.com/Vamoss/performance-hiperbole/tree/main/sketches/001)
2. p5js sem interatividade
   - [Particulas](https://vamoss.github.io/performance-hiperbole/sketches/002/)
   - [Código-fonte](https://github.com/Vamoss/performance-hiperbole/tree/main/sketches/002)
3. p5js com interatividade não multi-usuário
   - [Flock](https://vamoss.github.io/performance-hiperbole/sketches/003/)
   - [Código-fonte](https://github.com/Vamoss/performance-hiperbole/tree/main/sketches/003)
4. p5js sem interatividade utilizando uma imagem
   - [Dotting](https://vamoss.github.io/performance-hiperbole/sketches/004/)
   - [Código-fonte](https://github.com/Vamoss/performance-hiperbole/tree/main/sketches/004)
5. p5js sem interatividade utilizando uma imagem
   - [3D Geometries](https://vamoss.github.io/performance-hiperbole/sketches/005//dist)
   - [Código-fonte](https://github.com/Vamoss/performance-hiperbole/tree/main/sketches/005)
6. p5js com interatividade multi-usuário (MQTT) utilizando webpack
   - [Desenho coletivo](https://vamoss.github.io/performance-hiperbole/sketches/006/dist)
   - [Código-fonte](https://github.com/Vamoss/performance-hiperbole/tree/main/sketches/006)
7. p5js com interatividade multi-usuário (MQTT)
   - [Desenho coletivo](https://vamoss.github.io/performance-hiperbole/sketches/007)
   - [Código-fonte](https://github.com/Vamoss/performance-hiperbole/tree/main/sketches/007)
