function toggleCard(event) {
  const card = event.currentTarget;
  const isButton = event.target.closest('button');
  const seta = card.getElementsByClassName("seta")[0]

  if (!isButton) {
    card.classList.toggle('expanded');
    seta.classList.toggle("invertido")
    setTimeout(() => {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 300);
  }
}