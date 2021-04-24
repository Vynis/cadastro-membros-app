import { element } from 'protractor';
import { MembroService } from './../core/services/membro.service';
import { MembroModel } from './../core/models/membro.model';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConsultaCepService } from '../core/services/consulta-cep.service';
import { EstadosBrasileiros } from '../core/utils/estados-brasileiros.enum';
import { CongregacaoService } from '../core/services/congregracao.service';
import { CongregacaoModel } from '../core/models/congregacao.model';

@Component({
  selector: 'app-cadastro-membros',
  templateUrl: './cadastro-membros.component.html',
  styleUrls: ['./cadastro-membros.component.scss']
})
export class CadastroMembrosComponent implements OnInit {
  formulario: FormGroup;
  listaestadosBrasileiros = EstadosBrasileiros;
  carregandoDados = false;
  listaCongregacoes: CongregacaoModel[];

  constructor(
    private fb: FormBuilder,
    private membroService: MembroService,
    private cepService: ConsultaCepService,
     private congregacaoService: CongregacaoService
     ) { }

  ngOnInit() {
    this.buscarCongrecoesAtivas();
    this.createForm()
  }

  buscarCongrecoesAtivas() {
    this.congregacaoService.buscarTodasCongregacoes().subscribe(
      res => {
        this.listaCongregacoes = res.dados;
      }
    )
  }

  createForm() {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      telefoneFixo: [''],
      telefoneCelular: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required]],
      ruaAvenida: ['', [Validators.required]],
      numero: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      complemento: [''],
      congregacaoId: ['', [Validators.required]],
      dataInsercaoIgreja: ['', [Validators.required]],
      comoChegouIgreja: ['', [Validators.required]],
      dataConversao: ['', [Validators.required]],
      ehBatizado: ['', [Validators.required]],
      dataBatismo: [''],
      fazParteGrupoPequeno: ['', [Validators.required]],
      qualGrupoPequeno: ['',],
      fazParteMinisterio: ['', [Validators.required]],
      qualMinisterio: [''],
      deQuemRecebeuPastoreiro: ['', [Validators.required]],
      termo: ['', Validators.required],
      possuiEmail: [false]
    })
  }

  alertError(msg: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: msg,
    })
  }

  alertSucces() {
    Swal.fire('Obrigado...', 'Seu cadastro foi realizado com sucesso!', 'success');
    setTimeout(() => {
      location.reload();
    }, 5000);
  }

  buscar(event) {
    let datePipe = new DatePipe("pt-BR");
    let data = datePipe.transform(new Date(event.value), "dd/MM/yyyy");
  }

  submit() {

    const controls = this.formulario.controls;

    if (this.formulario.invalid) {

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.alertError('Favor preencher campos obrigátorios!');

      return;
    }

    const model = this.prepararModel();
    this.carregandoDados = true;

    this.membroService.salvar(model).subscribe(res => {
      if (res.success) {
        this.alertSucces();
      } else {
        this.alertError(res.dados);
      }
      this.carregandoDados = false;
    },
      err => {
        this.carregandoDados = false;
      }
    );

  }

  prepararModel(): MembroModel {
    let controls = this.formulario.controls;
    let _newMembro = new MembroModel();

    _newMembro.nome = controls.nome.value;
    _newMembro.dataNascimento = controls.dataNascimento.value;
    _newMembro.sexo = controls.sexo.value;
    _newMembro.telefoneFixo = controls.telefoneFixo.value;
    _newMembro.telefoneCelular = controls.telefoneCelular.value;
    _newMembro.estadoCivil = controls.estadoCivil.value;
    _newMembro.email = controls.email.value;
    _newMembro.cep = controls.cep.value;
    _newMembro.ruaAvenida = controls.ruaAvenida.value;
    _newMembro.numero = controls.numero.value;
    _newMembro.bairro = controls.bairro.value;
    _newMembro.cidade = controls.cidade.value;
    _newMembro.estado = controls.estado.value;
    _newMembro.complemento = controls.complemento.value;
    _newMembro.congregacaoId = controls.congregacaoId.value;
    _newMembro.dataInsercaoIgreja = controls.dataInsercaoIgreja.value;
    _newMembro.comoChegouIgreja = controls.comoChegouIgreja.value;
    _newMembro.dataConversao = controls.dataConversao.value;
    _newMembro.ehBatizado = controls.ehBatizado.value;
    _newMembro.dataBatismo = controls.dataBatismo.value;
    _newMembro.fazParteGrupoPequeno = controls.fazParteGrupoPequeno.value;
    _newMembro.qualGrupoPequeno = controls.qualGrupoPequeno.value;
    _newMembro.fazParteMinisterio = controls.fazParteMinisterio.value;
    _newMembro.qualMinisterio = controls.qualMinisterio.value;
    _newMembro.deQuemRecebeuPastoreiro = controls.deQuemRecebeuPastoreiro.value;
    _newMembro.possuiEmail = !controls.possuiEmail.value;

    return _newMembro;
  }

  validacaoBatismo() {
    let controls = this.formulario.controls;

    if (controls.ehBatizado.value === 'S') {
      controls.dataBatismo.setValidators([Validators.required]);
    }
    else {
      controls.dataBatismo.clearValidators();
    }

    controls.dataBatismo.updateValueAndValidity();

  }

  validaFazPartePequenoGrupo() {
    let controls = this.formulario.controls;

    if (controls.fazParteGrupoPequeno.value === 'S') {
      controls.qualGrupoPequeno.setValidators([Validators.required]);
    }
    else {
      controls.qualGrupoPequeno.clearValidators();
    }

    controls.qualGrupoPequeno.updateValueAndValidity();

  }

  validaFazParteMinisteririo() {
    let controls = this.formulario.controls;

    if (controls.fazParteMinisterio.value === 'S') {
      controls.qualMinisterio.setValidators([Validators.required]);
    }
    else {
      controls.qualMinisterio.clearValidators();
    }

    controls.qualMinisterio.updateValueAndValidity();
  }


  consultaCEP() {
    const controls = this.formulario.controls;
    const cep = this.formulario.controls.cep.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep).subscribe(dados => {

        if (!dados) {
          return;
        }

        controls.ruaAvenida.setValue(dados.logradouro);
        controls.complemento.setValue(dados.complemento);
        controls.bairro.setValue(dados.bairro);
        controls.cidade.setValue(dados.localidade);
        controls.estado.setValue(dados.uf);
        controls.cep.setValue(cep);
        controls.numero.setValue('');

      })
    }
  }

  eventoPosuiEmail() {
    let controls = this.formulario.controls;

    if (controls.possuiEmail.value === false) {
      controls.email.setValidators([Validators.required,Validators.email]);
      controls.email.enable();
    }
    else {
      controls.email.clearValidators();
      controls.email.setValue('');
      controls.email.disable();
    }

    controls.email.updateValueAndValidity();
  }

}
