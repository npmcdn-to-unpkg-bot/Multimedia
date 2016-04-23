import {Component, OnInit}  from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams, Router} from 'angular2/router';
import {Team, TeamService}   from './team.service';
import {Player, PlayerService}   from './player.service';
import {Login,LoginService} from './login.service';

@Component({
    templateUrl: 'app/html/equipo.component.html',
    styleUrls: ['app/css/equipo.component.css'],
    directives: [ROUTER_DIRECTIVES],
})
export class TeamDetailComponent implements OnInit {

    players: Player[];
    team: Team;

    constructor(private router: Router, routeParams: RouteParams, private service: TeamService, private playerservice: PlayerService, private loginService: LoginService) {
        let id = routeParams.get('id');
        service.getTeam(id).subscribe(
            team => this.team = team,
            error => console.error(error)
        );
    }

    ngOnInit(){
        this.playerservice.getPlayers().subscribe(
          players => this.players = players,
          error => console.log(error)
        );
      }

    removeTeam() {
        let okResponse = window.confirm("Do you want to remove this team?");
        if (okResponse) {
            this.service.removeTeam(this.team).subscribe(
                _ => this.router.navigate(['Teams']),
                error => console.error(error)
            )
        }
    }

    newPlayer() {
      this.router.navigate(['PlayerNew', {id: this.team.id}]);
    }

    editTeam() {
        this.router.navigate(['TeamEdit', { id: this.team.id}]);
    }
}
