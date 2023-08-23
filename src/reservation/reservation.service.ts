import { Reservation } from './../web-push/entities/reservation.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseReservationDto } from './dto/response-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const newReservation: Reservation = Reservation.of(
      createReservationDto.time,
      createReservationDto.Student,
      createReservationDto.Counselor,
    );
    try {
      const savedReservation = await this.reservationRepository.save(
        newReservation,
      );

      return 'Success create new Field';
    } catch (err) {
      console.error(err);
      return 'Fail look at the console';
    }
  }

  async findAll() {
    const reservations: Reservation[] = await this.reservationRepository.find({
      relations: {
        Student: true,
        Counselor: true,
      },
    });

    return reservations.map(ResponseReservationDto.from);
  }

  async findOne(id: number) {
    const reservation: Reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: {
        Student: true,
        Counselor: true,
      },
    });

    if (reservation === null) {
      throw new NotFoundException();
    }
    return ResponseReservationDto.from(reservation);
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation: Reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: {
        Student: true,
        Counselor: true,
      },
    });
    if (updateReservationDto.time !== null) {
      reservation.time = updateReservationDto.time;
    }

    if (updateReservationDto.Student !== null) {
      reservation.Student = updateReservationDto.Student;
    }

    if (updateReservationDto.Counselor !== null) {
      reservation.Counselor = updateReservationDto.Counselor;
    }

    return `This action updates a #${id} reservation`;
  }

  async remove(id: number) {
    const reservation: Reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: {
        Student: true,
        Counselor: true,
      },
    });
    this.reservationRepository.remove(reservation);
    return `This action removes a #${id} reservation`;
  }
}