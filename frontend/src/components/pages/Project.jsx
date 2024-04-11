export default function Project() {
  return (
    <div>
      <h7>Projekt Titel: Wordle-Spel med highscore-lista</h7>
      <h6>Om projekt</h6>
      <p>Det ord-spelet är en interaktiv webbapplikation utvecklad som del av kursen "7JS Full Stack" vid Lernia Yrkeshögskola.
        Detta spel kräver att användaren bestämmer sig hur många boksäver ordet ska ha och om det får innehålla bokstäver som upprepas innan man börjar.
        Den ger också feedback på de förutsagda orden så att du kan se vilka delar som är korrekta eller felaktiga. 
        Det är också något som kan njutas av alla åldersgrupper.
      </p>
      <h7>Tekniska Detaljer</h7>
      <p>Frontend: Spelet är byggt med React, vilket möjliggör en reposiv och interaktiv användarupplevelse. CSS-moduler har använts för styling för att skapa en attraktiv och lättanvänd gränssnitt.</p>
      <p>Backend: Detta projekt utvecklas med en backend som kör på Node.js, kompletterat med Express-remverket för att effektivisera hanteringen av routing och server-sida rendering, 
        specifikt för vår highscore-lista. För lagring av användardata samt highscores utnyttjar vi MongoDb, vilket ger oss en robust och skalbar lösning för datalagring.
        För att ytterligare förbättra projektets kodskrivning och skalbarhet har vi nyligen uppgraderat kodbasen genom att övergå från JSX till TypeScript. 
        Denna förändring har gjort det möjligt för oss att skriva mer strukturerad och underhållbar kod, vilket underlättar framtida utveckling och utvidgning av projektet.</p>
    </div>
  );
}
