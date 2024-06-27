<script lang="ts">
export default {
  props: ['data'],
  methods: {
    parseString(str: string) {
      let result = str.replace(/\n/g, '<br>')

      result = result.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><u>$1</u></strong>')

      result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      result = result.replace(/\*(.*?)\*/g, '<em>$1</em>')

      result = result.replace(/__(.*?)__/g, '<u>$1</u>')

      result = result.replace(/_(.*?)_/g, '<em>$1</em>')

      result = result.replace(/~~(.*?)~~/g, '<del>$1</del>')

      result = result.replace(
        /```(.*?)```/gs,
        '<pre class="bg-dark my-1 px-2 py-1 rounded-md">$1</pre>'
      )

      result = result.replace(/`(.*?)`/g, '<code>$1</code>')

      result = result.replace(
        /\{(.*?)\}/g,
        '<span class="bg-[#4682B4a7] hover:bg-[#4682B4] cursor-pointer rounded-md color-white px-2">@$1</span>'
      )

      return result
    }
  }
}
</script>

<template>
  <div class="preview-embed">
    <div class="left-bar" :style="'background-color: #' + data.color.toString(16) + ';'" />
    <div class="embed-content">
      <div class="inner">
        <div class="content">
          <div class="embed-contents">
            <div v-if="data?.author?.icon_url || data?.author?.name" class="author">
              <div v-if="data?.author?.icon_url" class="icon-url">
                <div class="author-icon">
                  <img :src="data.author.icon_url" style="border-radius: 50%" alt="author icon" />
                </div>
              </div>
              <p v-html="data?.author?.name" v-if="data?.author?.name" class="name"></p>
            </div>
            <div v-if="data.title" class="title">
              <p v-html="data.title" class="title"></p>
            </div>
            <div v-if="data.description" class="description">
              <p v-html="parseString(data.description)" class="description"></p>
            </div>
          </div>

          <div v-if="data.thumbnail_url" class="thumbnail">
            <div class="image-thumb">
              <img :src="data.thumbnail_url" alt="author icon" />
            </div>
          </div>
        </div>

        <div v-if="data.image_url" class="image">
          <div class="image-thumb">
            <img :src="data.image_url" alt="author icon" />
          </div>
        </div>
      </div>

      <div v-if="data?.footer?.text || data?.footer?.icon_url || data?.timestamp" class="footer">
        <div v-if="data?.footer?.icon_url" class="icon-url">
          <div class="footer-icon">
            <img :src="data?.footer?.icon_url" style="border-radius: 50%" alt="footer icon" />
          </div>
        </div>

        <p v-html="data?.footer?.text" v-if="data?.footer?.text" class="text"></p>
        <p v-if="data.timestamp" class="timestamp">
          {{
            (data?.footer?.text ? ' • ' : '') +
            'Today at ' +
            new Date(data.timestamp).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview-embed {
  min-height: 28px;
  max-width: 516px;
  width: fit-content;
  display: flex;
  flex: none !important;

  .left-bar {
    display: flex;
    align-items: center;
    border-radius: 3px 0 0 3px;
    justify-content: center;
    position: relative;
    transition: width 0.2s ease-in-out;
    width: 5px;
  }

  .embed-content {
    background-color: #2b2d31;
    padding: 14px;
    border: 1px solid rgba(46, 48, 54, 0.6);
    border-radius: 0 5px 5px 0;
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    .inner {
      flex: 1 0 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 25px;

      .content {
        display: flex;
        flex-wrap: wrap;
        gap: 1vw;
        flex: 1 0 100%;

        .embed-contents {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;

          .author {
            display: flex;
            flex: 100%;

            .icon-url {
              width: auto;
              position: relative;

              .author-icon {
                width: 32px;
                height: auto;
                aspect-ratio: 1 / 1;
                position: relative;
                margin-right: 8px;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
            }

            .name {
              font-size: 14px;
              font-weight: 400;
              display: flex;
            }
          }

          .title {
            flex: 100%;
            font-size: 15px;
            font-weight: 600;
            line-height: 22px;
          }

          .description {
            flex: 100%;
            color: #dcddde;
            font-size: 13px;
            font-weight: 400;
            letter-spacing: 0;
            line-height: 18px;
          }
        }

        .thumbnail {
          max-width: 80px;
          max-height: 80px;
          margin-left: auto;

          .image-thumb {
            position: relative;
            aspect-ratio: 1 / 1;
            border-radius: 5px;

            img {
              border-radius: 5px;
              max-width: 80px;
              max-height: 80px;
              object-fit: contain;
            }
          }
        }

        .fields {
          flex: 100%;
          display: flex;
          flex-wrap: wrap;

          .field {
            padding: 8px 16px;
            flex: 1 0 100%;
            display: flex;
            flex-direction: row;
            transition-duration: 0.5s;
            border-radius: 5px;

            .name-value {
              margin-right: 15px;
              width: 100%;

              .value {
                font-size: 15px;
                resize: none;
              }
            }

            .inline {
              border-radius: 5px;
              background-color: #1e1f22;
              margin: auto;
              width: 20px;
              height: 20px;

              display: flex;
              cursor: pointer;
              justify-content: center;
              align-items: center;

              span {
                font-size: 16px;
                width: 16px;
              }
            }
          }

          .inline-field {
            flex: 1 0 30% !important;
          }
        }
      }

      .fields {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        gap: 15px;

        .field {
          flex: 1 0 100%;
          .name {
            font-size: 13px;
            font-weight: 600;
            line-height: 18px;
          }

          .value {
            color: #dcddde;
            font-size: 13px;
            font-weight: 400;
            letter-spacing: 0;
            line-height: 18px;
          }
        }

        .inline-field {
          flex: 1 0 30%;
        }
      }

      .image {
        flex: 1 0 100%;
        width: 100%;
        min-height: 200px;
        height: auto;
        img {
          border-radius: 7px;
        }
      }
    }

    .footer {
      flex: 1 0 100%;
      display: flex;
      margin-top: 15px;
      align-items: center;

      .text {
        font-size: 12px;
        letter-spacing: 0;
        padding-right: 4px;
        color: #dcddde;
      }

      .timestamp {
        color: #dcddde;
        display: flex;
        flex: 1;
        margin: 0;
        align-items: center;
        font-size: 12px;
      }

      .icon-url {
        height: 38px;
        width: 38px;
        transition-duration: 0.5s;
        margin-right: 12px;

        .footer-icon {
          height: 38px;
          width: auto;
          aspect-ratio: 1 / 1;
          position: relative;
          border-radius: 50%;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }

  p {
    color: white;
    word-break: break-all;
  }
}
</style>
