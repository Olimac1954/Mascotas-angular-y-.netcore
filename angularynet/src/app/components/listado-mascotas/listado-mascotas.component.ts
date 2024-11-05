import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from '../../services/mascota.service';






@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrl: './listado-mascotas.component.css'
})
export class ListadoMascotasComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['nombre','edad','raza','color','peso','acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading:boolean =false

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _snackBar:MatSnackBar,private _mascotaService:MascotaService){}
  ngOnInit():void{
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = 'Item por pagina'
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerMascotas(){
    this.loading=true
    this._mascotaService.getMascotas().subscribe(data =>{
      this.loading=false
      this.dataSource.data = data;
    },error => {
      this.loading=false;
      alert('opps ocurrio un error')
    })
  }

  //   obtenerMascotas(){
  //   this.loading=true
  //   this._mascotaService.getMascotas().subscribe({
  //     next:(data) =>{
  //       this.loading=false
  //       this.dataSource.data = data;
  //     },
  //     error: (e) => this.loading = false,
  //     complete: () => console.info('complete')
  //   })
  // }


  eliminarMascotas(id:number){
    this.loading=true;
    this._mascotaService.deleteMascota(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerMascotas();
    });

  }
mensajeExito(){
  this._snackBar.open('la mascota fue eliminada con exito', '',
    {
      duration:4000,
      horizontalPosition:'right'
    });

}  


}
