<template>
    <section class="twitter-sect">
        <h1>Последим за программистами? :)</h1>
        <div class="tags-wrap">
            <h2>Отслеживаемые темы:</h2>
            <div class="all-tags-list">
                <div class="single-tag">
                    <span class="symbol">Laravel</span>
                </div>
                <div class="single-tag">
                    <span class="symbol">PHP</span>
                </div>
                <div class="single-tag">
                    <span class="symbol">Nodejs</span>
                </div>
                <div class="single-tag">
                    <span class="symbol">JS</span>
                </div>
            </div>
        </div>
        <div class="twitter-list">
            <div class="single-twit" v-for="tweet in tweets">
                <!--{{tweet.text}}-->
                <div class="content-wrap">
                    <div class="logo">
                        <img :src="tweet.user.profile_background_image_url" alt="" v-if="tweet.user.profile_background_image_url">
                        <img src="https://pbs.twimg.com/profile_images/796713233705037824/nVeKWX4u_bigger.jpg" alt="" v-if="!tweet.user.profile_background_image_url">
                    </div>
                    <div class="detail">
                        <div class="user-wrap">
                            <p class="user-name" :style="{'color': '#'+tweet.user.profile_text_color}">{{tweet.user.name}}</p>
                            <p class="user-nick">
                                @{{tweet.user.screen_name}}
                            </p>
                        </div>
                        <div class="user-content-wrap">
                            <p class="description">
                                {{tweet.text}}
                            </p>
                            <p class="source">
                                Источник: <span v-html="tweet.source"></span>
                            </p>
                        </div>
                    </div>
                    <div class="user-tags-wrap">
                        <p class="tag" v-for="tag in tweet.entities.hashtags">{{tag.text}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import moment from 'moment';
    export default {
        data(){
            return {
                tweets: []
            }
        },
        sockets:{
            'newTweet': function (data) {
                this.checkLength(data);

            }
        },
        methods: {
            checkLength(tweet){
                this.tweets.unshift(tweet);
                console.log(this.tweets.length);
                if(this.tweets.length >= 25){
                    this.tweets.splice(this.tweets.length-1, 1);
                }
            },
            moment: function (time) {
                moment.locale('ru');
                return moment(time);
            },
        }

    }
</script>