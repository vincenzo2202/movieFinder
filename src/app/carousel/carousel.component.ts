import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarouselComponent {
  // Aquí puedes definir las propiedades y métodos del componente
  images = [
    "../../../public/assets/image1.jpg",
    "../../../public/assets/image2.jpg",
    "../../../public/assets/image3.jpg",
    "../../../public/assets/image4.jpg",
    "../../../public/assets/image5.jpg",
    "../../../public/assets/image6.jpg",
    "../../../public/assets/image7.jpg",
    "../../../public/assets/image8.jpg",
    "../../../public/assets/image9.jpg",
    "../../../public/assets/image10.jpg",
    "../../../public/assets/image11.jpg",
    "../../../public/assets/image12.jpg",
    "../../../public/assets/image13.jpg",
    "../../../public/assets/image14.jpg",
  ];
  activeIndex = 0;
  interval: any;

  ngOnInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startAnimation(): void {
    this.interval = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 2000); // Cambiar cada 2 segundos
  }

  pauseAnimation(index: number): void {
    clearInterval(this.interval);
    this.activeIndex = index; // Fija la imagen activa al hacer hover
  }

  resumeAnimation(): void {
    this.startAnimation(); // Reinicia la animación al quitar el cursor
  }
}