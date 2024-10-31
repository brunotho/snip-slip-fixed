import consumer from "./consumer";

consumer.subscriptions.create("NotificationsChannel", {
  connected() {
    console.log("Notifications Channel ☑");
  },

  disconnected() {
    console.log("Disconnected from notifications channel");
  },

  received(data) {
    console.log("Received notification:", data);
    console.log("Current user ID:", getCurrentUserId());
    console.log("Invitation for user ID:", data.player?.id);
    if (data.type === "game_invitation" && data.player.id === getCurrentUserId()) {
      this.showGameInvitation(data)
    }
  },

  showGameInvitation(data) {
    const acceptInvitation = () => {
      const token = document.querySelector('[name="csrf-token"]').content;
      const gameSessionId = data.game_session_id;

      fetch(`/game_sessions/${gameSessionId}/accept_invitation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json().then(responseData => {
            console.log("Accepting invitation succeeded:", responseData)
            window.location.href = `/game_sessions/${gameSessionId}/invite`;
          });
        } else {
          throw new Error("Failed to accept invitation");
        }
      })
      .catch(error => console.error('Error accepting invitation:', error));
    }

    const modal = document.createElement('div')
    modal.innerHTML = `
      <div class="modal fade" id="gameInviteModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Game Invitation</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              ${data.inviter.name} has invited you to join a game!
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Decline</button>
              <button
                type="button"
                class="btn btn-primary"
                id="acceptButton"
              >
                Join Game
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    document.body.appendChild(modal)
    const modalElement = document.getElementById('gameInviteModal')

    if (typeof bootstrap === 'undefined') {
      console.error('Bootstrap is not loaded!')
      return
    }

    // Wait for next tick to ensure DOM is updated
    setTimeout(() => {
      const bsModal = new bootstrap.Modal(modalElement)

      // Add event listener for accept button
      document.getElementById('acceptButton').addEventListener('click', acceptInvitation)

      // Show modal
      bsModal.show()

      // Debug logs
      console.log('Modal element:', modalElement)
      console.log('Bootstrap Modal instance:', bsModal)
    }, 0)
  }
});

function getCurrentUserId() {
  return parseInt(document.body.dataset.currentUserId)
}
