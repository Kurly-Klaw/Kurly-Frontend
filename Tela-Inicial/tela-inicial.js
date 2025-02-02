function toggleCard(event) {
    const card = event.currentTarget;
    const isButton = event.target.closest('button');
    
    if (!isButton) {
        card.classList.toggle('expanded');
  }
}