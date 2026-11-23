<template>
  <section id="parceria" class="partner-section on-dark" aria-labelledby="partner-heading">
    <div class="section-container">
      <div class="partner-layout">
        <div class="partner-copy">
          <span class="kicker">
            {{ criadourosAtivos.length > 0 ? 'Para criadores' : 'Para criadores · Vagas de parceiros fundadores' }}
          </span>
          <h2 id="partner-heading" class="partner-title">
            Tem um criadouro legalizado? Seja um parceiro oficial do RingnackLab.
          </h2>
          <p class="partner-lede">
            {{
              criadourosAtivos.length > 0
                ? 'Apresente seu plantel para quem já chega informado sobre a espécie e faz questão de procedência, nota fiscal e anilha.'
                : 'Estamos abrindo o diretório nacional de criadouros legalizados por estado. Garanta seu espaço entre os primeiros parceiros oficiais do @ringnacklab.'
            }}
          </p>

          <ul class="partner-terms">
            <li class="partner-term">
              <span class="partner-term-title">Contato direto, sem comissão</span>
              <span class="partner-term-text">O interessado chama direto no seu WhatsApp.</span>
            </li>
            <li class="partner-term">
              <span class="partner-term-title">Descoberta por estado e cidade</span>
              <span class="partner-term-text">Sua ficha aparece para compradores da sua região.</span>
            </li>
            <li class="partner-term">
              <span class="partner-term-title">Exclusivo para plantéis regularizados</span>
              <span class="partner-term-text">Conferimos CTF/IBAMA e licença estadual ativos.</span>
            </li>
          </ul>
        </div>

        <aside class="partner-aside" aria-label="Alcance do @ringnacklab">
          <div class="partner-stats">
            <div>
              <div class="partner-stat-number">+2 mil</div>
              <div class="partner-stat-label">seguidores focados em Ring Neck</div>
            </div>
            <div>
              <div class="partner-stat-number">+30 mil</div>
              <div class="partner-stat-label">visualizações em um único vídeo</div>
            </div>
          </div>

          <a
            :href="gerarLinkParceriaComercial()"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-gold btn-block partner-cta"
          >
            <AppIcon name="whatsapp" class="btn-icon" />
            Quero ser parceiro
            <span class="sr-only">(abre o WhatsApp em nova aba)</span>
          </a>
          <p class="partner-note">Atendimento direto com a equipe do RingnackLab pelo WhatsApp.</p>

          <p v-if="criadourosAtivos.length === 0" class="partner-buyer-link">
            Está procurando um Ring Neck?
            <a
              :href="gerarLinkSugestaoWhatsapp()"
              target="_blank"
              rel="noopener noreferrer"
              class="partner-inline-link"
            >
              Peça aviso para o seu estado no WhatsApp
            </a>
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { criadourosAtivos, gerarLinkParceriaComercial, gerarLinkSugestaoWhatsapp } = useCriadouros()
</script>
