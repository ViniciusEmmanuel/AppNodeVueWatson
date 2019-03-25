<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <h4>{{err}}</h4>
        <div id="botao">
            <b-button-group>
                <b-file accept=".txt"
                        :state="Boolean(files)"
                        ref="myFiles" v-on:change="abrir()" browse-text="Abrir"
                        placeholder="Escolha arquivo .txt"></b-file>
            </b-button-group>
            <b-button-group>
                <div v-if="Boolean(this.txt)">
                    <b-button variant="primary" v-on:click="tradutor()">Traduzir</b-button>
                </div>
                <div v-if="Boolean(this.traducao && this.txt)">
                    <a href="" id="save">
                        <b-button variant="success" v-on:click="salvar()">Salvar</b-button>
                    </a>
                </div>

                <b-button variant="danger" v-on:click="fechar()">Fechar</b-button>
            </b-button-group>
        </div>
        <div id="txtarea">
            <div id="textarea1">
                <b-form-textarea v-model="txt" placeholder="Escreva ou abra seu texto" rows="14"/>
            </div>
            <div id="textarea2">
                <b-form-textarea v-model="traducao" rows="14" readonly/>
            </div>
        </div>

        <div v-if="this.valida === true">
            <h2>Personality Insights</h2>
            <table class="table table-hover ">
                <tbody>
                <tr v-for="item in personality[0] " :key="item.id">
                    <td>
                        <b-dropdown id="ddown1" text="Personality: percentile" variant="light" class="m-md-2">
                            <b-dropdown-item>
                                {{item.name}}: [{{item.percentile}}]
                            </b-dropdown-item>
                            <b-dropdown-item v-for=" i in item.children" :key="i.id">
                                {{i.name}}: [{{i.percentile}}]
                            </b-dropdown-item>
                        </b-dropdown>
                    </td>
                    <td>
                        <b-dropdown id="ddown1" text="Needs: percentile" variant="light" class="m-md-2">
                            <b-dropdown-item v-for="item in personality[1] " :key="item.id">
                                {{item.name}}: [{{item.percentile}}]
                            </b-dropdown-item>
                        </b-dropdown>
                    </td>
                    <td>
                        <b-dropdown id="ddown1" text="Values: percentile" variant="light" class="m-md-2">
                            <b-dropdown-item v-for="item in personality[2] " :key="item.id">
                                {{item.name}}: [{{item.percentile}}]
                            </b-dropdown-item>
                        </b-dropdown>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import func from '../functions';

    export default {
        name: "Tradutor",
        props: {
            msg: String
        },
        data() {
            return {
                txt: '',
                traducao: '',
                analise: '',
                files: '',
                err: '',
                personality: [],
                valida: false
            }
        },
        methods: {
            tradutor: function () {
                let vm = this;
                let dados = {
                    text: this.txt,
                    model_id: 'pt-en'
                };
                try {
                    func.postTranslate(dados).then((resp) => {
                        vm.traducao = resp.data[0].translation;
                        vm.analizar(vm.traducao);
                    });
                } catch (err) {
                    vm.err = "Translate: " + err;
                }
            },
            analizar: function (txt) {
                let vm = this;
                let dados = {
                    text: txt
                };
                try {
                    /*Valida a quantida de letras. Watson não aceitas um texto menor que 350
                    * Textos menores o app crashed
                    */
                    if (dados.text.length > 350) {
                        vm.err = '';
                        func.postPersonality(dados).then((resp) => {
                            vm.personality = resp.data;
                            console.log(vm.personality);
                            vm.valida = true;
                        });
                    } else {
                        vm.personality = null;
                        vm.valida = false;
                        vm.err = "Atenção: A analise de personalidade so ocorre com  " +
                            " um texto com no minimo 350 letras!!";
                    }
                } catch (err) {
                    vm.err = "Personality: " + err;
                }
            },
            abrir: function () {
                //Instancia do vue
                let vm = this;
                /*Coleta o file do input. O vue com booststrap retorna um objeto
                *tendo que percorrer ate a propriedade files para poder
                * ler o arquivo
                */
                vm.files = vm.$refs.myFiles.$refs.input.files;
                let fileExtension = /text.*/;
                //Verifica se é .txt
                if (vm.files[0].type.match(fileExtension)) {
                    //Limpa a mensagem de erro
                    vm.err = ' ';
                    //Inicializa e abre o arquivo
                    let reader = new FileReader();
                    reader.onload = function () {
                        vm.txt = reader.result;
                    };
                    reader.readAsText(vm.files[0]);
                } else {
                    vm.err = "Por favor selecione arquivo .txt"
                }
            },
            salvar: function () {
                //Instancia da Aplicação
                let vm = this;
                //Pega o texto em Ingles
                let text = vm.traducao;
                let name = prompt("Escolha o nome para salvar o arquivo!!");
                //Aciona o link para download sem isso o navegador não abre a janela para salvar
                let save = document.getElementById("save");
                //Cria um novo arquivo em txt
                let file = new Blob([text], {type: 'txt'});
                //Referencia o arquivo ao link para salvar
                save.href = URL.createObjectURL(file);
                //Nomeia o arquivo
                save.download = name + "-emInglês.txt";
            },
            fechar: function () {
                //Limpa as variaveis
                let vm = this;
                vm.txt = null;
                vm.traducao = null;
                vm.personality = null;
                vm.valida = false;
                vm.files = null;
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 5px;

    }

    #textarea1, #textarea2, table, h2 {
        padding: 10px;
        margin: 10px;
    }

    #textarea1{
        display: table-cell;
        float: left;
        width: 500px;
    }

    #textarea2 {
        display: table-cell;
        float: right;
        width: 500px;
    }

    #txtarea, table{
        display: table;
        margin-left: auto;
        margin-right: auto;
        height: 70px;
    }
    table{
        width: 70%;
        height: auto;
    }
</style>