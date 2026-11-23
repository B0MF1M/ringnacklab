<template>
  <section id="faq" class="faq-section surface-stone" aria-labelledby="faq-heading">
    <div class="section-container">
      <div class="faq-layout">
        <div class="faq-intro">
          <span class="kicker">Dúvidas frequentes</span>
          <h2 id="faq-heading" class="section-title">Antes de comprar ou anunciar</h2>
          <p class="section-lede">
            Reunimos as respostas sobre compra legalizada, contato com os criadouros e acesso aos
            guias digitais.
          </p>

          <p class="faq-alert">
            <strong>Atenção:</strong> desconfie sempre de preços muito abaixo do mercado e de quem
            se recusa a informar o número de registro ambiental.
          </p>

          <p class="faq-contact">
            Ficou com outra dúvida?
            <a
              :href="gerarLinkSugestaoWhatsapp()"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link"
            >
              Fale com a equipe no WhatsApp
            </a>
          </p>
        </div>

        <div class="faq-list">
          <details
            v-for="(item, index) in perguntas"
            :key="item.pergunta"
            class="faq-item"
            :open="index === 0"
          >
            <summary class="faq-question">
              <span>{{ item.pergunta }}</span>
              <span class="faq-sign" aria-hidden="true"></span>
            </summary>
            <p class="faq-answer">
              {{ item.resposta }}
              <a v-if="item.link" :href="item.link.href">{{ item.link.texto }}</a>
            </p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { gerarLinkSugestaoWhatsapp } = useCriadouros()

const perguntas: { pergunta: string; resposta: string; link?: { href: string; texto: string } }[] = [
  {
    pergunta: 'O RingnackLab vende aves?',
    resposta:
      'Não. Atuamos exclusivamente como diretório de divulgação de criadouros legalizados. Toda negociação, pagamento, conferência de documentos e entrega acontece diretamente entre você e o criadouro.'
  },
  {
    pergunta: 'O que devo conferir antes de fechar a compra de um Ring Neck?',
    resposta:
      'Exija sempre nota fiscal emitida no seu nome, anilha fechada e identificada na ave, número de registro ativo do criadouro (CTF/IBAMA e licença estadual) e a documentação de transporte (GTA) caso haja envio.'
  },
  {
    pergunta: 'Os criadouros enviam para outros estados?',
    resposta:
      'Depende da logística de cada criadouro. A região atendida aparece na ficha; confirme prazos, valores e emissão da GTA diretamente pelo WhatsApp do criador.'
  },
  {
    pergunta: 'Quanto custa um Ring Neck legalizado?',
    resposta:
      'O valor varia bastante conforme a mutação, idade, sexo e região. Consulte diretamente os criadouros da sua área para ver disponibilidade atual.'
  },
  {
    pergunta: 'Como recebo o pacote com os 3 guias depois da compra?',
    resposta:
      'O pagamento é processado pela Kiwify e, assim que aprovado, o acesso aos 3 guias digitais é liberado imediatamente no e-mail informado na compra para ler no celular, tablet ou computador.'
  },
  {
    pergunta: 'Não encontrei criadouro na minha região. O que faço?',
    resposta:
      'Ao filtrar pelo seu estado ou cidade sem resultados, use o botão “Pedir indicação no WhatsApp”. Nossa equipe verifica a opção legalizada mais próxima ou recebe a sua sugestão de criadouro.'
  },
  {
    pergunta: 'Tenho um criadouro legalizado. Como faço para entrar no diretório?',
    resposta: 'Confira os critérios e chame nossa equipe pela seção',
    link: { href: '#parceria', texto: 'Para criadores.' }
  }
]
</script>
