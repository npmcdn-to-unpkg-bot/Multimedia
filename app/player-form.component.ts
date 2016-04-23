import {Component}  from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {Player, PlayerService}   from './player.service';
import {Team, TeamService}   from './team.service';

@Component({
  selector: "player-form",
  templateUrl: "app/html/formJugador.component.html",
  styleUrls: ["app/css/formJugador.component.css"],
})
export class PlayerFormComponent {

  newPlayer: boolean;
  player: Player;
  team: Team;

  constructor(
    private router:Router,
    routeParams:RouteParams,
    private service: PlayerService,
    private teamservice: TeamService){

      let id = routeParams.get('id');
      let orden = routeParams.get('orden');
      if(orden){
        service.getPlayer(id).subscribe(
          player => this.player = player,
          error => console.error(error)
        );
        this.newPlayer = false;
      } else {
        teamservice.getTeam(id).subscribe(
          team => this.team = team,
          error => console.error(error)
        );
        this.player = new Player(undefined,'', '');
        this.newPlayer = true;
      }
  }

  cancel() {
    window.history.back();
  }

  save() {
    this.player.equipo = this.team;
    this.service.savePlayer(this.player);
    window.history.back();
  }
}
