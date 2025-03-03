(() => {
  var e = {
      386: function (e) {
        e.exports = (function () {
          "use strict";
          var e = 6e4,
            t = 36e5,
            i = "millisecond",
            n = "second",
            r = "minute",
            o = "hour",
            a = "day",
            s = "week",
            l = "month",
            u = "quarter",
            c = "year",
            d = "date",
            p = "Invalid Date",
            f =
              /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            h =
              /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            _ = {
              name: "en",
              weekdays:
                "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                  "_"
                ),
              months:
                "January_February_March_April_May_June_July_August_September_October_November_December".split(
                  "_"
                ),
              ordinal: function (e) {
                var t = ["th", "st", "nd", "rd"],
                  i = e % 100;
                return "[" + e + (t[(i - 20) % 10] || t[i] || t[0]) + "]";
              },
            },
            v = function (e, t, i) {
              var n = String(e);
              return !n || n.length >= t
                ? e
                : "" + Array(t + 1 - n.length).join(i) + e;
            },
            m = {
              s: v,
              z: function (e) {
                var t = -e.utcOffset(),
                  i = Math.abs(t),
                  n = Math.floor(i / 60),
                  r = i % 60;
                return (t <= 0 ? "+" : "-") + v(n, 2, "0") + ":" + v(r, 2, "0");
              },
              m: function e(t, i) {
                if (t.date() < i.date()) return -e(i, t);
                var n = 12 * (i.year() - t.year()) + (i.month() - t.month()),
                  r = t.clone().add(n, l),
                  o = i - r < 0,
                  a = t.clone().add(n + (o ? -1 : 1), l);
                return +(-(n + (i - r) / (o ? r - a : a - r)) || 0);
              },
              a: function (e) {
                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
              },
              p: function (e) {
                return (
                  {
                    M: l,
                    y: c,
                    w: s,
                    d: a,
                    D: d,
                    h: o,
                    m: r,
                    s: n,
                    ms: i,
                    Q: u,
                  }[e] ||
                  String(e || "")
                    .toLowerCase()
                    .replace(/s$/, "")
                );
              },
              u: function (e) {
                return void 0 === e;
              },
            },
            b = "en",
            g = {};
          g[b] = _;
          var y = "$isDayjsObject",
            x = function (e) {
              return e instanceof A || !(!e || !e[y]);
            },
            w = function e(t, i, n) {
              var r;
              if (!t) return b;
              if ("string" == typeof t) {
                var o = t.toLowerCase();
                g[o] && (r = o), i && ((g[o] = i), (r = o));
                var a = t.split("-");
                if (!r && a.length > 1) return e(a[0]);
              } else {
                var s = t.name;
                (g[s] = t), (r = s);
              }
              return !n && r && (b = r), r || (!n && b);
            },
            $ = function (e, t) {
              if (x(e)) return e.clone();
              var i = "object" == typeof t ? t : {};
              return (i.date = e), (i.args = arguments), new A(i);
            },
            O = m;
          (O.l = w),
            (O.i = x),
            (O.w = function (e, t) {
              return $(e, {
                locale: t.$L,
                utc: t.$u,
                x: t.$x,
                $offset: t.$offset,
              });
            });
          var A = (function () {
              function _(e) {
                (this.$L = w(e.locale, null, !0)),
                  this.parse(e),
                  (this.$x = this.$x || e.x || {}),
                  (this[y] = !0);
              }
              var v = _.prototype;
              return (
                (v.parse = function (e) {
                  (this.$d = (function (e) {
                    var t = e.date,
                      i = e.utc;
                    if (null === t) return new Date(NaN);
                    if (O.u(t)) return new Date();
                    if (t instanceof Date) return new Date(t);
                    if ("string" == typeof t && !/Z$/i.test(t)) {
                      var n = t.match(f);
                      if (n) {
                        var r = n[2] - 1 || 0,
                          o = (n[7] || "0").substring(0, 3);
                        return i
                          ? new Date(
                              Date.UTC(
                                n[1],
                                r,
                                n[3] || 1,
                                n[4] || 0,
                                n[5] || 0,
                                n[6] || 0,
                                o
                              )
                            )
                          : new Date(
                              n[1],
                              r,
                              n[3] || 1,
                              n[4] || 0,
                              n[5] || 0,
                              n[6] || 0,
                              o
                            );
                      }
                    }
                    return new Date(t);
                  })(e)),
                    this.init();
                }),
                (v.init = function () {
                  var e = this.$d;
                  (this.$y = e.getFullYear()),
                    (this.$M = e.getMonth()),
                    (this.$D = e.getDate()),
                    (this.$W = e.getDay()),
                    (this.$H = e.getHours()),
                    (this.$m = e.getMinutes()),
                    (this.$s = e.getSeconds()),
                    (this.$ms = e.getMilliseconds());
                }),
                (v.$utils = function () {
                  return O;
                }),
                (v.isValid = function () {
                  return !(this.$d.toString() === p);
                }),
                (v.isSame = function (e, t) {
                  var i = $(e);
                  return this.startOf(t) <= i && i <= this.endOf(t);
                }),
                (v.isAfter = function (e, t) {
                  return $(e) < this.startOf(t);
                }),
                (v.isBefore = function (e, t) {
                  return this.endOf(t) < $(e);
                }),
                (v.$g = function (e, t, i) {
                  return O.u(e) ? this[t] : this.set(i, e);
                }),
                (v.unix = function () {
                  return Math.floor(this.valueOf() / 1e3);
                }),
                (v.valueOf = function () {
                  return this.$d.getTime();
                }),
                (v.startOf = function (e, t) {
                  var i = this,
                    u = !!O.u(t) || t,
                    p = O.p(e),
                    f = function (e, t) {
                      var n = O.w(
                        i.$u ? Date.UTC(i.$y, t, e) : new Date(i.$y, t, e),
                        i
                      );
                      return u ? n : n.endOf(a);
                    },
                    h = function (e, t) {
                      return O.w(
                        i
                          .toDate()
                          [e].apply(
                            i.toDate("s"),
                            (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)
                          ),
                        i
                      );
                    },
                    _ = this.$W,
                    v = this.$M,
                    m = this.$D,
                    b = "set" + (this.$u ? "UTC" : "");
                  switch (p) {
                    case c:
                      return u ? f(1, 0) : f(31, 11);
                    case l:
                      return u ? f(1, v) : f(0, v + 1);
                    case s:
                      var g = this.$locale().weekStart || 0,
                        y = (_ < g ? _ + 7 : _) - g;
                      return f(u ? m - y : m + (6 - y), v);
                    case a:
                    case d:
                      return h(b + "Hours", 0);
                    case o:
                      return h(b + "Minutes", 1);
                    case r:
                      return h(b + "Seconds", 2);
                    case n:
                      return h(b + "Milliseconds", 3);
                    default:
                      return this.clone();
                  }
                }),
                (v.endOf = function (e) {
                  return this.startOf(e, !1);
                }),
                (v.$set = function (e, t) {
                  var s,
                    u = O.p(e),
                    p = "set" + (this.$u ? "UTC" : ""),
                    f = ((s = {}),
                    (s[a] = p + "Date"),
                    (s[d] = p + "Date"),
                    (s[l] = p + "Month"),
                    (s[c] = p + "FullYear"),
                    (s[o] = p + "Hours"),
                    (s[r] = p + "Minutes"),
                    (s[n] = p + "Seconds"),
                    (s[i] = p + "Milliseconds"),
                    s)[u],
                    h = u === a ? this.$D + (t - this.$W) : t;
                  if (u === l || u === c) {
                    var _ = this.clone().set(d, 1);
                    _.$d[f](h),
                      _.init(),
                      (this.$d = _.set(
                        d,
                        Math.min(this.$D, _.daysInMonth())
                      ).$d);
                  } else f && this.$d[f](h);
                  return this.init(), this;
                }),
                (v.set = function (e, t) {
                  return this.clone().$set(e, t);
                }),
                (v.get = function (e) {
                  return this[O.p(e)]();
                }),
                (v.add = function (i, u) {
                  var d,
                    p = this;
                  i = Number(i);
                  var f = O.p(u),
                    h = function (e) {
                      var t = $(p);
                      return O.w(t.date(t.date() + Math.round(e * i)), p);
                    };
                  if (f === l) return this.set(l, this.$M + i);
                  if (f === c) return this.set(c, this.$y + i);
                  if (f === a) return h(1);
                  if (f === s) return h(7);
                  var _ =
                      ((d = {}), (d[r] = e), (d[o] = t), (d[n] = 1e3), d)[f] ||
                      1,
                    v = this.$d.getTime() + i * _;
                  return O.w(v, this);
                }),
                (v.subtract = function (e, t) {
                  return this.add(-1 * e, t);
                }),
                (v.format = function (e) {
                  var t = this,
                    i = this.$locale();
                  if (!this.isValid()) return i.invalidDate || p;
                  var n = e || "YYYY-MM-DDTHH:mm:ssZ",
                    r = O.z(this),
                    o = this.$H,
                    a = this.$m,
                    s = this.$M,
                    l = i.weekdays,
                    u = i.months,
                    c = i.meridiem,
                    d = function (e, i, r, o) {
                      return (e && (e[i] || e(t, n))) || r[i].slice(0, o);
                    },
                    f = function (e) {
                      return O.s(o % 12 || 12, e, "0");
                    },
                    _ =
                      c ||
                      function (e, t, i) {
                        var n = e < 12 ? "AM" : "PM";
                        return i ? n.toLowerCase() : n;
                      };
                  return n.replace(h, function (e, n) {
                    return (
                      n ||
                      (function (e) {
                        switch (e) {
                          case "YY":
                            return String(t.$y).slice(-2);
                          case "YYYY":
                            return O.s(t.$y, 4, "0");
                          case "M":
                            return s + 1;
                          case "MM":
                            return O.s(s + 1, 2, "0");
                          case "MMM":
                            return d(i.monthsShort, s, u, 3);
                          case "MMMM":
                            return d(u, s);
                          case "D":
                            return t.$D;
                          case "DD":
                            return O.s(t.$D, 2, "0");
                          case "d":
                            return String(t.$W);
                          case "dd":
                            return d(i.weekdaysMin, t.$W, l, 2);
                          case "ddd":
                            return d(i.weekdaysShort, t.$W, l, 3);
                          case "dddd":
                            return l[t.$W];
                          case "H":
                            return String(o);
                          case "HH":
                            return O.s(o, 2, "0");
                          case "h":
                            return f(1);
                          case "hh":
                            return f(2);
                          case "a":
                            return _(o, a, !0);
                          case "A":
                            return _(o, a, !1);
                          case "m":
                            return String(a);
                          case "mm":
                            return O.s(a, 2, "0");
                          case "s":
                            return String(t.$s);
                          case "ss":
                            return O.s(t.$s, 2, "0");
                          case "SSS":
                            return O.s(t.$ms, 3, "0");
                          case "Z":
                            return r;
                        }
                        return null;
                      })(e) ||
                      r.replace(":", "")
                    );
                  });
                }),
                (v.utcOffset = function () {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                }),
                (v.diff = function (i, d, p) {
                  var f,
                    h = this,
                    _ = O.p(d),
                    v = $(i),
                    m = (v.utcOffset() - this.utcOffset()) * e,
                    b = this - v,
                    g = function () {
                      return O.m(h, v);
                    };
                  switch (_) {
                    case c:
                      f = g() / 12;
                      break;
                    case l:
                      f = g();
                      break;
                    case u:
                      f = g() / 3;
                      break;
                    case s:
                      f = (b - m) / 6048e5;
                      break;
                    case a:
                      f = (b - m) / 864e5;
                      break;
                    case o:
                      f = b / t;
                      break;
                    case r:
                      f = b / e;
                      break;
                    case n:
                      f = b / 1e3;
                      break;
                    default:
                      f = b;
                  }
                  return p ? f : O.a(f);
                }),
                (v.daysInMonth = function () {
                  return this.endOf(l).$D;
                }),
                (v.$locale = function () {
                  return g[this.$L];
                }),
                (v.locale = function (e, t) {
                  if (!e) return this.$L;
                  var i = this.clone(),
                    n = w(e, t, !0);
                  return n && (i.$L = n), i;
                }),
                (v.clone = function () {
                  return O.w(this.$d, this);
                }),
                (v.toDate = function () {
                  return new Date(this.valueOf());
                }),
                (v.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null;
                }),
                (v.toISOString = function () {
                  return this.$d.toISOString();
                }),
                (v.toString = function () {
                  return this.$d.toUTCString();
                }),
                _
              );
            })(),
            S = A.prototype;
          return (
            ($.prototype = S),
            [
              ["$ms", i],
              ["$s", n],
              ["$m", r],
              ["$H", o],
              ["$W", a],
              ["$M", l],
              ["$y", c],
              ["$D", d],
            ].forEach(function (e) {
              S[e[1]] = function (t) {
                return this.$g(t, e[0], e[1]);
              };
            }),
            ($.extend = function (e, t) {
              return e.$i || (e(t, A, $), (e.$i = !0)), $;
            }),
            ($.locale = w),
            ($.isDayjs = x),
            ($.unix = function (e) {
              return $(1e3 * e);
            }),
            ($.en = g[b]),
            ($.Ls = g),
            ($.p = {}),
            $
          );
        })();
      },
      88: function (e, t, i) {
        e.exports = (function (e) {
          "use strict";
          var t = (function (e) {
              return e && "object" == typeof e && "default" in e
                ? e
                : { default: e };
            })(e),
            i = {
              s: "ein paar Sekunden",
              m: ["eine Minute", "einer Minute"],
              mm: "%d Minuten",
              h: ["eine Stunde", "einer Stunde"],
              hh: "%d Stunden",
              d: ["ein Tag", "einem Tag"],
              dd: ["%d Tage", "%d Tagen"],
              M: ["ein Monat", "einem Monat"],
              MM: ["%d Monate", "%d Monaten"],
              y: ["ein Jahr", "einem Jahr"],
              yy: ["%d Jahre", "%d Jahren"],
            };
          function n(e, t, n) {
            var r = i[n];
            return Array.isArray(r) && (r = r[t ? 0 : 1]), r.replace("%d", e);
          }
          var r = {
            name: "de",
            weekdays:
              "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
                "_"
              ),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            months:
              "Januar_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_"
              ),
            monthsShort:
              "Jan._Feb._MÃ¤rz_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split(
                "_"
              ),
            ordinal: function (e) {
              return e + ".";
            },
            weekStart: 1,
            yearStart: 4,
            formats: {
              LTS: "HH:mm:ss",
              LT: "HH:mm",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd, D. MMMM YYYY HH:mm",
            },
            relativeTime: {
              future: "in %s",
              past: "vor %s",
              s: n,
              m: n,
              mm: n,
              h: n,
              hh: n,
              d: n,
              dd: n,
              M: n,
              MM: n,
              y: n,
              yy: n,
            },
          };
          return t.default.locale(r, null, !0), r;
        })(i(386));
      },
      297: function (e, t, i) {
        e.exports = (function (e) {
          "use strict";
          var t = (function (e) {
              return e && "object" == typeof e && "default" in e
                ? e
                : { default: e };
            })(e),
            i = {
              name: "en-gb",
              weekdays:
                "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                  "_"
                ),
              weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
              weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
              months:
                "January_February_March_April_May_June_July_August_September_October_November_December".split(
                  "_"
                ),
              monthsShort:
                "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
              weekStart: 1,
              yearStart: 4,
              relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years",
              },
              formats: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm",
              },
              ordinal: function (e) {
                var t = ["th", "st", "nd", "rd"],
                  i = e % 100;
                return "[" + e + (t[(i - 20) % 10] || t[i] || t[0]) + "]";
              },
            };
          return t.default.locale(i, null, !0), i;
        })(i(386));
      },
      954: function (e, t, i) {
        e.exports = (function (e) {
          "use strict";
          var t = (function (e) {
              return e && "object" == typeof e && "default" in e
                ? e
                : { default: e };
            })(e),
            i = {
              name: "es",
              monthsShort:
                "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
              weekdays:
                "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split(
                  "_"
                ),
              weekdaysShort: "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"),
              weekdaysMin: "do_lu_ma_mi_ju_vi_sÃ¡".split("_"),
              months:
                "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
                  "_"
                ),
              weekStart: 1,
              formats: {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY H:mm",
                LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
              },
              relativeTime: {
                future: "en %s",
                past: "hace %s",
                s: "unos segundos",
                m: "un minuto",
                mm: "%d minutos",
                h: "una hora",
                hh: "%d horas",
                d: "un dÃ­a",
                dd: "%d dÃ­as",
                M: "un mes",
                MM: "%d meses",
                y: "un aÃ±o",
                yy: "%d aÃ±os",
              },
              ordinal: function (e) {
                return e + "Âº";
              },
            };
          return t.default.locale(i, null, !0), i;
        })(i(386));
      },
      531: function (e, t, i) {
        e.exports = (function (e) {
          "use strict";
          var t = (function (e) {
              return e && "object" == typeof e && "default" in e
                ? e
                : { default: e };
            })(e),
            i = {
              name: "fr",
              weekdays:
                "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split(
                  "_"
                ),
              weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
              weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
              months:
                "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split(
                  "_"
                ),
              monthsShort:
                "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split(
                  "_"
                ),
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm",
              },
              relativeTime: {
                future: "dans %s",
                past: "il y a %s",
                s: "quelques secondes",
                m: "une minute",
                mm: "%d minutes",
                h: "une heure",
                hh: "%d heures",
                d: "un jour",
                dd: "%d jours",
                M: "un mois",
                MM: "%d mois",
                y: "un an",
                yy: "%d ans",
              },
              ordinal: function (e) {
                return e + (1 === e ? "er" : "");
              },
            };
          return t.default.locale(i, null, !0), i;
        })(i(386));
      },
      178: function (e, t, i) {
        e.exports = (function (e) {
          "use strict";
          var t = (function (e) {
              return e && "object" == typeof e && "default" in e
                ? e
                : { default: e };
            })(e),
            i = {
              name: "pt",
              weekdays:
                "domingo_segunda-feira_terÃ§a-feira_quarta-feira_quinta-feira_sexta-feira_sÃ¡bado".split(
                  "_"
                ),
              weekdaysShort: "dom_seg_ter_qua_qui_sex_sab".split("_"),
              weekdaysMin: "Do_2Âª_3Âª_4Âª_5Âª_6Âª_Sa".split("_"),
              months:
                "janeiro_fevereiro_marÃ§o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
                  "_"
                ),
              monthsShort:
                "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
              ordinal: function (e) {
                return e + "Âº";
              },
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY [Ã s] HH:mm",
                LLLL: "dddd, D [de] MMMM [de] YYYY [Ã s] HH:mm",
              },
              relativeTime: {
                future: "em %s",
                past: "hÃ¡ %s",
                s: "alguns segundos",
                m: "um minuto",
                mm: "%d minutos",
                h: "uma hora",
                hh: "%d horas",
                d: "um dia",
                dd: "%d dias",
                M: "um mÃªs",
                MM: "%d meses",
                y: "um ano",
                yy: "%d anos",
              },
            };
          return t.default.locale(i, null, !0), i;
        })(i(386));
      },
      566: function (e) {
        e.exports = (function () {
          "use strict";
          var e = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A",
          };
          return function (t, i, n) {
            var r = i.prototype,
              o = r.format;
            (n.en.formats = e),
              (r.format = function (t) {
                void 0 === t && (t = "YYYY-MM-DDTHH:mm:ssZ");
                var i = this.$locale().formats,
                  n = (function (t, i) {
                    return t.replace(
                      /(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,
                      function (t, n, r) {
                        var o = r && r.toUpperCase();
                        return (
                          n ||
                          i[r] ||
                          e[r] ||
                          i[o].replace(
                            /(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,
                            function (e, t, i) {
                              return t || i.slice(1);
                            }
                          )
                        );
                      }
                    );
                  })(t, void 0 === i ? {} : i);
                return o.call(this, n);
              });
          };
        })();
      },
      570: function (e) {
        e.exports = (function () {
          "use strict";
          var e = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 },
            t = {};
          return function (i, n, r) {
            var o,
              a = function (e, i, n) {
                void 0 === n && (n = {});
                var r = new Date(e),
                  o = (function (e, i) {
                    void 0 === i && (i = {});
                    var n = i.timeZoneName || "short",
                      r = e + "|" + n,
                      o = t[r];
                    return (
                      o ||
                        ((o = new Intl.DateTimeFormat("en-US", {
                          hour12: !1,
                          timeZone: e,
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          timeZoneName: n,
                        })),
                        (t[r] = o)),
                      o
                    );
                  })(i, n);
                return o.formatToParts(r);
              },
              s = function (t, i) {
                for (var n = a(t, i), o = [], s = 0; s < n.length; s += 1) {
                  var l = n[s],
                    u = l.type,
                    c = l.value,
                    d = e[u];
                  d >= 0 && (o[d] = parseInt(c, 10));
                }
                var p = o[3],
                  f = 24 === p ? 0 : p,
                  h =
                    o[0] +
                    "-" +
                    o[1] +
                    "-" +
                    o[2] +
                    " " +
                    f +
                    ":" +
                    o[4] +
                    ":" +
                    o[5] +
                    ":000",
                  _ = +t;
                return (r.utc(h).valueOf() - (_ -= _ % 1e3)) / 6e4;
              },
              l = n.prototype;
            (l.tz = function (e, t) {
              void 0 === e && (e = o);
              var i = this.utcOffset(),
                n = this.toDate(),
                a = n.toLocaleString("en-US", { timeZone: e }),
                s = Math.round((n - new Date(a)) / 1e3 / 60),
                l = r(a, { locale: this.$L })
                  .$set("millisecond", this.$ms)
                  .utcOffset(
                    15 * -Math.round(n.getTimezoneOffset() / 15) - s,
                    !0
                  );
              if (t) {
                var u = l.utcOffset();
                l = l.add(i - u, "minute");
              }
              return (l.$x.$timezone = e), l;
            }),
              (l.offsetName = function (e) {
                var t = this.$x.$timezone || r.tz.guess(),
                  i = a(this.valueOf(), t, { timeZoneName: e }).find(function (
                    e
                  ) {
                    return "timezonename" === e.type.toLowerCase();
                  });
                return i && i.value;
              });
            var u = l.startOf;
            (l.startOf = function (e, t) {
              if (!this.$x || !this.$x.$timezone) return u.call(this, e, t);
              var i = r(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                locale: this.$L,
              });
              return u.call(i, e, t).tz(this.$x.$timezone, !0);
            }),
              (r.tz = function (e, t, i) {
                var n = i && t,
                  a = i || t || o,
                  l = s(+r(), a);
                if ("string" != typeof e) return r(e).tz(a);
                var u = (function (e, t, i) {
                    var n = e - 60 * t * 1e3,
                      r = s(n, i);
                    if (t === r) return [n, t];
                    var o = s((n -= 60 * (r - t) * 1e3), i);
                    return r === o
                      ? [n, r]
                      : [e - 60 * Math.min(r, o) * 1e3, Math.max(r, o)];
                  })(r.utc(e, n).valueOf(), l, a),
                  c = u[0],
                  d = u[1],
                  p = r(c).utcOffset(d);
                return (p.$x.$timezone = a), p;
              }),
              (r.tz.guess = function () {
                return Intl.DateTimeFormat().resolvedOptions().timeZone;
              }),
              (r.tz.setDefault = function (e) {
                o = e;
              });
          };
        })();
      },
      957: function (e) {
        e.exports = (function () {
          "use strict";
          var e = "minute",
            t = /[+-]\d\d(?::?\d\d)?/g,
            i = /([+-]|\d\d)/g;
          return function (n, r, o) {
            var a = r.prototype;
            (o.utc = function (e) {
              return new r({ date: e, utc: !0, args: arguments });
            }),
              (a.utc = function (t) {
                var i = o(this.toDate(), { locale: this.$L, utc: !0 });
                return t ? i.add(this.utcOffset(), e) : i;
              }),
              (a.local = function () {
                return o(this.toDate(), { locale: this.$L, utc: !1 });
              });
            var s = a.parse;
            a.parse = function (e) {
              e.utc && (this.$u = !0),
                this.$utils().u(e.$offset) || (this.$offset = e.$offset),
                s.call(this, e);
            };
            var l = a.init;
            a.init = function () {
              if (this.$u) {
                var e = this.$d;
                (this.$y = e.getUTCFullYear()),
                  (this.$M = e.getUTCMonth()),
                  (this.$D = e.getUTCDate()),
                  (this.$W = e.getUTCDay()),
                  (this.$H = e.getUTCHours()),
                  (this.$m = e.getUTCMinutes()),
                  (this.$s = e.getUTCSeconds()),
                  (this.$ms = e.getUTCMilliseconds());
              } else l.call(this);
            };
            var u = a.utcOffset;
            a.utcOffset = function (n, r) {
              var o = this.$utils().u;
              if (o(n))
                return this.$u
                  ? 0
                  : o(this.$offset)
                  ? u.call(this)
                  : this.$offset;
              if (
                "string" == typeof n &&
                ((n = (function (e) {
                  void 0 === e && (e = "");
                  var n = e.match(t);
                  if (!n) return null;
                  var r = ("" + n[0]).match(i) || ["-", 0, 0],
                    o = r[0],
                    a = 60 * +r[1] + +r[2];
                  return 0 === a ? 0 : "+" === o ? a : -a;
                })(n)),
                null === n)
              )
                return this;
              var a = Math.abs(n) <= 16 ? 60 * n : n,
                s = this;
              if (r) return (s.$offset = a), (s.$u = 0 === n), s;
              if (0 !== n) {
                var l = this.$u
                  ? this.toDate().getTimezoneOffset()
                  : -1 * this.utcOffset();
                ((s = this.local().add(a + l, e)).$offset = a),
                  (s.$x.$localOffset = l);
              } else s = this.utc();
              return s;
            };
            var c = a.format;
            (a.format = function (e) {
              var t = e || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
              return c.call(this, t);
            }),
              (a.valueOf = function () {
                var e = this.$utils().u(this.$offset)
                  ? 0
                  : this.$offset +
                    (this.$x.$localOffset || this.$d.getTimezoneOffset());
                return this.$d.valueOf() - 6e4 * e;
              }),
              (a.isUTC = function () {
                return !!this.$u;
              }),
              (a.toISOString = function () {
                return this.toDate().toISOString();
              }),
              (a.toString = function () {
                return this.toDate().toUTCString();
              });
            var d = a.toDate;
            a.toDate = function (e) {
              return "s" === e && this.$offset
                ? o(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate()
                : d.call(this);
            };
            var p = a.diff;
            a.diff = function (e, t, i) {
              if (e && this.$u === e.$u) return p.call(this, e, t, i);
              var n = this.local(),
                r = o(e).local();
              return p.call(n, r, t, i);
            };
          };
        })();
      },
      506: (e, t) => {
        "use strict";
        t.Z = function (e, t) {
          return [
            ["gerade eben", "vor einer Weile"],
            ["vor %s Sekunden", "in %s Sekunden"],
            ["vor 1 Minute", "in 1 Minute"],
            ["vor %s Minuten", "in %s Minuten"],
            ["vor 1 Stunde", "in 1 Stunde"],
            ["vor %s Stunden", "in %s Stunden"],
            ["vor 1 Tag", "in 1 Tag"],
            ["vor %s Tagen", "in %s Tagen"],
            ["vor 1 Woche", "in 1 Woche"],
            ["vor %s Wochen", "in %s Wochen"],
            ["vor 1 Monat", "in 1 Monat"],
            ["vor %s Monaten", "in %s Monaten"],
            ["vor 1 Jahr", "in 1 Jahr"],
            ["vor %s Jahren", "in %s Jahren"],
          ][t];
        };
      },
      23: (e, t) => {
        "use strict";
        t.Z = function (e, t) {
          return [
            ["justo ahora", "en un rato"],
            ["hace %s segundos", "en %s segundos"],
            ["hace 1 minuto", "en 1 minuto"],
            ["hace %s minutos", "en %s minutos"],
            ["hace 1 hora", "en 1 hora"],
            ["hace %s horas", "en %s horas"],
            ["hace 1 dÃ­a", "en 1 dÃ­a"],
            ["hace %s dÃ­as", "en %s dÃ­as"],
            ["hace 1 semana", "en 1 semana"],
            ["hace %s semanas", "en %s semanas"],
            ["hace 1 mes", "en 1 mes"],
            ["hace %s meses", "en %s meses"],
            ["hace 1 aÃ±o", "en 1 aÃ±o"],
            ["hace %s aÃ±os", "en %s aÃ±os"],
          ][t];
        };
      },
      971: (e, t) => {
        "use strict";
        t.Z = function (e, t) {
          return [
            ["Ã  l'instant", "dans un instant"],
            ["il y a %s secondes", "dans %s secondes"],
            ["il y a 1 minute", "dans 1 minute"],
            ["il y a %s minutes", "dans %s minutes"],
            ["il y a 1 heure", "dans 1 heure"],
            ["il y a %s heures", "dans %s heures"],
            ["il y a 1 jour", "dans 1 jour"],
            ["il y a %s jours", "dans %s jours"],
            ["il y a 1 semaine", "dans 1 semaine"],
            ["il y a %s semaines", "dans %s semaines"],
            ["il y a 1 mois", "dans 1 mois"],
            ["il y a %s mois", "dans %s mois"],
            ["il y a 1 an", "dans 1 an"],
            ["il y a %s ans", "dans %s ans"],
          ][t];
        };
      },
      99: (e, t) => {
        "use strict";
        t.Z = function (e, t) {
          return [
            ["agora mesmo", "agora"],
            ["hÃ¡ %s segundos", "em %s segundos"],
            ["hÃ¡ um minuto", "em um minuto"],
            ["hÃ¡ %s minutos", "em %s minutos"],
            ["hÃ¡ uma hora", "em uma hora"],
            ["hÃ¡ %s horas", "em %s horas"],
            ["hÃ¡ um dia", "em um dia"],
            ["hÃ¡ %s dias", "em %s dias"],
            ["hÃ¡ uma semana", "em uma semana"],
            ["hÃ¡ %s semanas", "em %s semanas"],
            ["hÃ¡ um mÃªs", "em um mÃªs"],
            ["hÃ¡ %s meses", "em %s meses"],
            ["hÃ¡ um ano", "em um ano"],
            ["hÃ¡ %s anos", "em %s anos"],
          ][t];
        };
      },
      295: () => {
        Alpine.store("editor", {
          page: "create",
          update(e) {
            void 0 !== e.page && (this.page = e.page);
          },
        });
      },
      837: () => {
        Alpine.store("form", {
          id: null,
          user: null,
          slug: null,
          name: null,
          title: null,
          status: null,
          path: null,
          resultsPath: null,
          url: null,
          embedUrl: null,
          design: null,
          pin: null,
          version: null,
          createdAt: null,
          updatedAt: null,
          resetAt: null,
          openDate: null,
          closeDate: null,
          responseCount: 0,
          workspace: {},
          properties: {},
          sections: [],
          update(e) {
            void 0 !== e.id && (this.id = e.id),
              void 0 !== e.user && (this.user = e.user),
              void 0 !== e.slug && (this.slug = e.slug),
              void 0 !== e.name && (this.name = e.name),
              void 0 !== e.title && (this.title = e.title),
              void 0 !== e.status && (this.status = e.status),
              void 0 !== e.path && (this.path = e.path),
              void 0 !== e.resultsPath && (this.resultsPath = e.resultsPath),
              void 0 !== e.url && (this.url = e.url),
              void 0 !== e.embedUrl && (this.embedUrl = e.embedUrl),
              void 0 !== e.design && (this.design = e.design),
              void 0 !== e.pin && (this.pin = e.pin),
              void 0 !== e.version && (this.version = e.version),
              void 0 !== e.createdAt && (this.createdAt = e.createdAt),
              void 0 !== e.updatedAt && (this.updatedAt = e.updatedAt),
              void 0 !== e.resetAt && (this.resetAt = e.resetAt),
              void 0 !== e.openDate && (this.openDate = e.openDate),
              void 0 !== e.closeDate && (this.closeDate = e.closeDate),
              void 0 !== e.responseCount &&
                (this.responseCount = e.responseCount),
              void 0 !== e.workspace && (this.workspace = e.workspace),
              void 0 !== e.properties && (this.properties = e.properties),
              void 0 !== e.sections && (this.sections = e.sections);
          },
        });
      },
      150: () => {
        Alpine.store("formResults", {
          id: null,
          responseCount: 0,
          fields: {},
          update(e) {
            void 0 !== e.id && (this.id = e.id),
              void 0 !== e.responseCount &&
                (this.responseCount = e.responseCount),
              void 0 !== e.fields && (this.fields = e.fields);
          },
        });
      },
      529: () => {
        Alpine.store("meta", {
          isLoading: !1,
          availableLanguages: [],
          displayLang: "en",
          csrfToken: "",
          update(e) {
            void 0 !== e.isLoading && (this.isLoading = e.isLoading),
              void 0 !== e.availableLanguages &&
                (this.availableLanguages = e.availableLanguages),
              void 0 !== e.displayLang && (this.displayLang = e.displayLang),
              void 0 !== e.csrfToken && (this.csrfToken = e.csrfToken);
          },
          setLoading(e) {
            this.isLoading = e;
          },
        });
      },
      599: () => {
        Alpine.store("notification", {
          title: "Notification",
          description: "",
          type: "success",
          timeout: 3e3,
          open: !1,
          show(e) {
            (this.title = e.title),
              (this.description = e.description),
              (this.type = e.type ? e.type : "success"),
              (this.timeout = e.timeout ? e.timeout : 3e3),
              (this.open = !0),
              setTimeout(() => {
                this.open = !1;
              }, this.timeout);
          },
          hide() {
            this.open = !1;
          },
        });
      },
      395: () => {
        Alpine.store("poll", {
          id: null,
          title: null,
          status: null,
          type: null,
          path: null,
          resultsPath: null,
          url: null,
          embedUrl: null,
          pinCode: null,
          version: null,
          createdAt: null,
          resetAt: null,
          isVotable: null,
          isResultsVisible: null,
          media: {},
          theme: {},
          workspace: {},
          pollMeta: {},
          pollOptions: [],
          pollConfig: {},
          pollParticipants: [],
          polls: [],
          update(e) {
            void 0 !== e.id && (this.id = e.id),
              void 0 !== e.title && (this.title = e.title),
              void 0 !== e.status && (this.status = e.status),
              void 0 !== e.type && (this.type = e.type),
              void 0 !== e.path && (this.path = e.path),
              void 0 !== e.resultsPath && (this.resultsPath = e.resultsPath),
              void 0 !== e.url && (this.url = e.url),
              void 0 !== e.embedUrl && (this.embedUrl = e.embedUrl),
              void 0 !== e.pinCode && (this.pinCode = e.pinCode),
              void 0 !== e.version && (this.version = e.version),
              void 0 !== e.createdAt && (this.createdAt = e.createdAt),
              void 0 !== e.resetAt && (this.resetAt = e.resetAt),
              void 0 !== e.media && (this.media = e.media),
              void 0 !== e.theme && (this.theme = e.theme),
              void 0 !== e.workspace && (this.workspace = e.workspace),
              void 0 !== e.pollMeta && (this.pollMeta = e.pollMeta),
              void 0 !== e.pollOptions && (this.pollOptions = e.pollOptions),
              void 0 !== e.pollConfig && (this.pollConfig = e.pollConfig),
              void 0 !== e.polls && (this.polls = e.polls);
          },
        });
      },
      847: () => {
        Alpine.store("pollResults", {
          id: null,
          version: null,
          resultsKey: null,
          voteCount: 0,
          participantCount: 0,
          lastVoteAt: null,
          pollOptions: [],
          pollParticipants: [],
          update(e) {
            void 0 !== e.id && (this.id = e.id),
              void 0 !== e.version && (this.version = e.version),
              void 0 !== e.resultsKey && (this.resultsKey = e.resultsKey),
              void 0 !== e.voteCount && (this.voteCount = e.voteCount),
              void 0 !== e.participantCount &&
                (this.participantCount = e.participantCount),
              void 0 !== e.lastVoteAt && (this.lastVoteAt = e.lastVoteAt),
              void 0 !== e.pollOptions && (this.pollOptions = e.pollOptions),
              void 0 !== e.pollParticipants &&
                (this.pollParticipants = e.pollParticipants);
          },
        });
      },
      853: () => {
        Alpine.store("pollUser", {
          isAdmin: !1,
          subscriptions: [],
          update(e) {
            void 0 !== e.isAdmin && (this.isAdmin = e.isAdmin),
              void 0 !== e.subscriptions &&
                (this.subscriptions = e.subscriptions);
          },
        });
      },
      578: () => {
        Alpine.store("user", {
          id: "",
          username: "",
          displayname: "",
          avatarPath: "",
          avatarUrl: "",
          oruk: "",
          apiKey: "",
          subscription: "",
          userConfig: {},
          userMeta: {},
          update(e) {
            void 0 !== e.id && (this.id = e.id),
              void 0 !== e.username && (this.username = e.username),
              void 0 !== e.displayname && (this.displayname = e.displayname),
              void 0 !== e.avatarPath && (this.avatarPath = e.avatarPath),
              void 0 !== e.avatarUrl && (this.avatarUrl = e.avatarUrl),
              void 0 !== e.oruk && (this.oruk = e.oruk),
              void 0 !== e.apiKey && (this.apiKey = e.apiKey),
              void 0 !== e.subscription && (this.subscription = e.subscription),
              e.userConfig &&
                void 0 !== e.userConfig.language &&
                (this.userConfig.language = e.userConfig.language),
              e.userConfig &&
                void 0 !== e.userConfig.locale &&
                (this.userConfig.locale = e.userConfig.locale),
              e.userConfig &&
                void 0 !== e.userConfig.timezone &&
                (this.userConfig.timezone = e.userConfig.timezone),
              e.userConfig &&
                void 0 !== e.userConfig.clockType &&
                (this.userConfig.clockType = e.userConfig.clockType),
              e.userConfig &&
                void 0 !== e.userConfig.firstDayOfWeek &&
                (this.userConfig.firstDayOfWeek = e.userConfig.firstDayOfWeek),
              e.userConfig &&
                void 0 !== e.userConfig.appearance &&
                (this.userConfig.appearance = e.userConfig.appearance),
              e.userConfig &&
                void 0 !== e.userConfig.notifyMeetingVote &&
                (this.userConfig.notifyMeetingVote =
                  e.userConfig.notifyMeetingVote),
              e.userConfig &&
                void 0 !== e.userConfig.notifyDeadline &&
                (this.userConfig.notifyDeadline = e.userConfig.notifyDeadline),
              e.userConfig &&
                void 0 !== e.userConfig.notificationDelay &&
                (this.userConfig.notificationDelay =
                  e.userConfig.notificationDelay),
              e.userConfig &&
                void 0 !== e.userConfig.defaultThemeId &&
                (this.userConfig.defaultThemeId = e.userConfig.defaultThemeId),
              e.userConfig &&
                void 0 !== e.userConfig.defaultWorkspaceId &&
                (this.userConfig.defaultWorkspaceId =
                  e.userConfig.defaultWorkspaceId),
              e.userConfig &&
                void 0 !== e.userConfig.activePollSlug &&
                (this.userConfig.activePollSlug = e.userConfig.activePollSlug),
              e.userMeta &&
                void 0 !== e.userMeta.pendingEmail &&
                (this.userMeta.pendingEmail = e.userMeta.pendingEmail),
              e.userMeta &&
                void 0 !== e.userMeta.lastEmailedAt &&
                (this.userMeta.lastEmailedAt = e.userMeta.lastEmailedAt),
              e.userMeta &&
                void 0 !== e.userMeta.lastLoginAt &&
                (this.userMeta.lastLoginAt = e.userMeta.lastLoginAt),
              e.userMeta &&
                void 0 !== e.userMeta.hasWebhooks &&
                (this.userMeta.hasWebhooks = e.userMeta.hasWebhooks),
              e.userMeta &&
                void 0 !== e.userMeta.website &&
                (this.userMeta.website = e.userMeta.website),
              e.userMeta &&
                void 0 !== e.userMeta.about &&
                (this.userMeta.about = e.userMeta.about),
              e.userMeta &&
                void 0 !== e.userMeta.countryCode &&
                (this.userMeta.countryCode = e.userMeta.countryCode);
          },
          async logout() {
            localStorage.clear();
            const e = await strawpoll.fetchAPI("/auth/logout", {
              method: "POST",
              body: JSON.stringify({ forward_to: window.location.pathname }),
            });
            e.error || (window.location.href = e.location);
          },
        });
      },
    },
    t = {};
  function i(n) {
    var r = t[n];
    if (void 0 !== r) return r.exports;
    var o = (t[n] = { exports: {} });
    return e[n].call(o.exports, o, o.exports, i), o.exports;
  }
  (i.d = (e, t) => {
    for (var n in t)
      i.o(t, n) &&
        !i.o(e, n) &&
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
  }),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (i.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var e = {};
      function t(e, t, i, n) {
        return {
          items: [],
          activeKey: null,
          orderedKeys: [],
          activatedByKeyPress: !1,
          activateSelectedOrFirst: e.debounce(function () {
            n(!1);
          }),
          registerItem(e, t, i, n) {
            this.items.push({ key: e, el: t, value: i, disabled: n }),
              this.orderedKeys.push(e),
              this.reorderKeys(),
              this.activateSelectedOrFirst();
          },
          unregisterItem(e) {
            let t = this.items.findIndex((t) => t.key === e);
            -1 !== t && this.items.splice(t, 1),
              (t = this.orderedKeys.indexOf(e)),
              -1 !== t && this.orderedKeys.splice(t, 1),
              this.reorderKeys(),
              this.activateSelectedOrFirst();
          },
          getItemByKey(e) {
            return this.items.find((t) => t.key === e);
          },
          getItemByValue(t) {
            return this.items.find((i) => e.raw(i.value) === e.raw(t));
          },
          getItemByEl(e) {
            return this.items.find((t) => t.el === e);
          },
          getItemsByValues(t) {
            let i = t.map((t) => e.raw(t)),
              n = this.items.filter((t) => i.includes(e.raw(t.value)));
            return (
              (n = n.slice().sort((e, t) => {
                let i = e.el.compareDocumentPosition(t.el);
                return i & Node.DOCUMENT_POSITION_FOLLOWING
                  ? -1
                  : i & Node.DOCUMENT_POSITION_PRECEDING
                  ? 1
                  : 0;
              })),
              n
            );
          },
          getActiveItem() {
            if (!this.hasActive()) return null;
            let e = this.items.find((e) => e.key === this.activeKey);
            return e || this.deactivateKey(this.activeKey), e;
          },
          activateItem(e) {
            e && this.activateKey(e.key);
          },
          reorderKeys: e.debounce(function () {
            (this.orderedKeys = this.items.map((e) => e.key)),
              (this.orderedKeys = this.orderedKeys.slice().sort((e, t) => {
                if (null === e || null === t) return 0;
                let i = this.items.find((t) => t.key === e).el,
                  n = this.items.find((e) => e.key === t).el,
                  r = i.compareDocumentPosition(n);
                return r & Node.DOCUMENT_POSITION_FOLLOWING
                  ? -1
                  : r & Node.DOCUMENT_POSITION_PRECEDING
                  ? 1
                  : 0;
              })),
              this.orderedKeys.includes(this.activeKey) ||
                this.deactivateKey(this.activeKey);
          }),
          activeEl() {
            if (this.activeKey)
              return this.items.find((e) => e.key === this.activeKey).el;
          },
          isActiveEl(e) {
            let t = this.items.find((t) => t.el === e);
            return this.activeKey === t;
          },
          activateEl(e) {
            let t = this.items.find((t) => t.el === e);
            this.activateKey(t.key);
          },
          isDisabledEl(e) {
            return this.items.find((t) => t.el === e).disabled;
          },
          get isScrollingTo() {
            return this.scrollingCount > 0;
          },
          scrollingCount: 0,
          activateAndScrollToKey(e, t) {
            this.getItemByKey(e) &&
              (this.scrollingCount++,
              this.activateKey(e, t),
              this.items
                .find((t) => t.key === e)
                .el.scrollIntoView({ block: "nearest" }),
              setTimeout(() => {
                this.scrollingCount--;
              }, 25));
          },
          isDisabled(e) {
            let t = this.items.find((t) => t.key === e);
            return !!t && t.disabled;
          },
          get nonDisabledOrderedKeys() {
            return this.orderedKeys.filter((e) => !this.isDisabled(e));
          },
          hasActive() {
            return !!this.activeKey;
          },
          wasActivatedByKeyPress() {
            return this.activatedByKeyPress;
          },
          isActiveKey(e) {
            return this.activeKey === e;
          },
          activateKey(e, t = !1) {
            this.isDisabled(e) ||
              ((this.activeKey = e), (this.activatedByKeyPress = t));
          },
          deactivateKey(e) {
            this.activeKey === e &&
              ((this.activeKey = null), (this.activatedByKeyPress = !1));
          },
          deactivate() {
            this.activeKey &&
              (this.isScrollingTo ||
                ((this.activeKey = null), (this.activatedByKeyPress = !1)));
          },
          nextKey() {
            if (!this.activeKey) return;
            let e = this.nonDisabledOrderedKeys.findIndex(
              (e) => e === this.activeKey
            );
            return this.nonDisabledOrderedKeys[e + 1];
          },
          prevKey() {
            if (!this.activeKey) return;
            let e = this.nonDisabledOrderedKeys.findIndex(
              (e) => e === this.activeKey
            );
            return this.nonDisabledOrderedKeys[e - 1];
          },
          firstKey() {
            return this.nonDisabledOrderedKeys[0];
          },
          lastKey() {
            return this.nonDisabledOrderedKeys[
              this.nonDisabledOrderedKeys.length - 1
            ];
          },
          searchQuery: "",
          clearSearch: e.debounce(function () {
            this.searchQuery = "";
          }, 350),
          searchKey(e) {
            let t;
            this.clearSearch(), (this.searchQuery += e);
            for (let e in this.items)
              if (
                this.items[e].el.textContent
                  .trim()
                  .toLowerCase()
                  .startsWith(this.searchQuery)
              ) {
                t = this.items[e].key;
                break;
              }
            if (this.nonDisabledOrderedKeys.includes(t)) return t;
          },
          activateByKeyEvent(e, t = !1, n = () => !1, r = () => {}, o) {
            let a, s;
            o(!0);
            let l = !0;
            switch (e.key) {
              case ["ArrowDown", "ArrowRight"]["vertical" === i ? 0 : 1]:
                if ((e.preventDefault(), e.stopPropagation(), o(!1), !n())) {
                  r();
                  break;
                }
                this.reorderKeys(),
                  (s = this.hasActive()),
                  (a = s ? this.nextKey() : this.firstKey());
                break;
              case ["ArrowUp", "ArrowLeft"]["vertical" === i ? 0 : 1]:
                if ((e.preventDefault(), e.stopPropagation(), o(!1), !n())) {
                  r();
                  break;
                }
                this.reorderKeys(),
                  (s = this.hasActive()),
                  (a = s ? this.prevKey() : this.lastKey());
                break;
              case "Home":
              case "PageUp":
                e.preventDefault(),
                  e.stopPropagation(),
                  o(!1),
                  this.reorderKeys(),
                  (s = this.hasActive()),
                  (a = this.firstKey());
                break;
              case "End":
              case "PageDown":
                e.preventDefault(),
                  e.stopPropagation(),
                  o(!1),
                  this.reorderKeys(),
                  (s = this.hasActive()),
                  (a = this.lastKey());
                break;
              default:
                (l = this.activatedByKeyPress),
                  t && 1 === e.key.length && (a = this.searchKey(e.key));
            }
            a && this.activateAndScrollToKey(a, l);
          },
        };
      }
      function n(e, t, i, n) {
        let o = r(i, n);
        o.forEach((e) => (e._x_hiddenInput = !0)),
          o.forEach((e) => (e._x_ignore = !0));
        let a = t.children,
          s = [];
        for (let e = 0; e < a.length; e++) {
          let t = a[e];
          if (!t._x_hiddenInput) break;
          s.push(t);
        }
        e.mutateDom(() => {
          s.forEach((e) => e.remove()),
            o.reverse().forEach((e) => t.prepend(e));
        });
      }
      function r(e, t, i = []) {
        if ("object" != typeof (n = t) || null === n) {
          let i = document.createElement("input");
          return (
            i.setAttribute("type", "hidden"),
            i.setAttribute("name", e),
            i.setAttribute("value", "" + t),
            [i]
          );
        }
        for (let n in t) i = i.concat(r(`${e}[${n}]`, t[n]));
        var n;
        return i;
      }
      function o(e) {
        return new Promise((t) => queueMicrotask(() => t(e())));
      }
      i.r(e),
        i.d(e, {
          cancel: () => Wo,
          format: () => Ko,
          register: () => Lo,
          render: () => zo,
        });
      var a = {
        first(e, t, i = (e) => e, n = () => {}) {
          let r = e.$data(t).__itemEls[0];
          return r
            ? "template" === r.tagName.toLowerCase() || r.__isDisabled.value
              ? this.next(e, r, i)
              : i(r)
            : n();
        },
        last(e, t, i = (e) => e, n = () => {}) {
          let r = e.$data(t).__itemEls.slice(-1)[0];
          return r
            ? r.__isDisabled.value
              ? this.previous(e, r, i)
              : i(r)
            : n();
        },
        next(e, t, i = (e) => e, n = () => {}) {
          if (!t) return n();
          let r = e.$data(t).__itemEls,
            o = r[r.indexOf(t) + 1];
          return o
            ? o.__isDisabled.value || "template" === o.tagName.toLowerCase()
              ? this.next(e, o, i, n)
              : i(o)
            : n();
        },
        previous(e, t, i = (e) => e, n = () => {}) {
          if (!t) return n();
          let r = e.$data(t).__itemEls,
            o = r[r.indexOf(t) - 1];
          return o
            ? o.__isDisabled.value || "template" === o.tagName.toLowerCase()
              ? this.previous(e, o, i, n)
              : i(o)
            : n();
        },
        searchQuery: "",
        debouncedClearSearch: void 0,
        clearSearch(e) {
          this.debouncedClearSearch ||
            (this.debouncedClearSearch = e.debounce(function () {
              this.searchQuery = "";
            }, 350)),
            this.debouncedClearSearch();
        },
        search(e, t, i, n) {
          if (i.length > 1) return;
          this.searchQuery += i;
          let r = e
            .raw(e.$data(t).__itemEls)
            .find((e) =>
              e.textContent.trim().toLowerCase().startsWith(this.searchQuery)
            );
          r && !r.__isDisabled.value && n(r), this.clearSearch(e);
        },
      };
      var s = [
          "input",
          "select",
          "textarea",
          "a[href]",
          "button",
          "[tabindex]:not(slot)",
          "audio[controls]",
          "video[controls]",
          '[contenteditable]:not([contenteditable="false"])',
          "details>summary:first-of-type",
          "details",
        ],
        l = s.join(","),
        u = "undefined" == typeof Element,
        c = u
          ? function () {}
          : Element.prototype.matches ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector,
        d =
          !u && Element.prototype.getRootNode
            ? function (e) {
                return e.getRootNode();
              }
            : function (e) {
                return e.ownerDocument;
              },
        p = function (e, t, i) {
          var n = Array.prototype.slice.apply(e.querySelectorAll(l));
          return t && c.call(e, l) && n.unshift(e), n.filter(i);
        },
        f = function e(t, i, n) {
          for (var r = [], o = Array.from(t); o.length; ) {
            var a = o.shift();
            if ("SLOT" === a.tagName) {
              var s = a.assignedElements(),
                u = e(s.length ? s : a.children, !0, n);
              n.flatten
                ? r.push.apply(r, u)
                : r.push({ scope: a, candidates: u });
            } else {
              c.call(a, l) && n.filter(a) && (i || !t.includes(a)) && r.push(a);
              var d =
                  a.shadowRoot ||
                  ("function" == typeof n.getShadowRoot && n.getShadowRoot(a)),
                p = !n.shadowRootFilter || n.shadowRootFilter(a);
              if (d && p) {
                var f = e(!0 === d ? a.children : d.children, !0, n);
                n.flatten
                  ? r.push.apply(r, f)
                  : r.push({ scope: a, candidates: f });
              } else o.unshift.apply(o, a.children);
            }
          }
          return r;
        },
        h = function (e, t) {
          return e.tabIndex < 0 &&
            (t ||
              /^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) ||
              e.isContentEditable) &&
            isNaN(parseInt(e.getAttribute("tabindex"), 10))
            ? 0
            : e.tabIndex;
        },
        _ = function (e, t) {
          return e.tabIndex === t.tabIndex
            ? e.documentOrder - t.documentOrder
            : e.tabIndex - t.tabIndex;
        },
        v = function (e) {
          return "INPUT" === e.tagName;
        },
        m = function (e) {
          var t = e.getBoundingClientRect(),
            i = t.width,
            n = t.height;
          return 0 === i && 0 === n;
        },
        b = function (e, t) {
          return !(
            t.disabled ||
            (function (e) {
              return v(e) && "hidden" === e.type;
            })(t) ||
            (function (e, t) {
              var i = t.displayCheck,
                n = t.getShadowRoot;
              if ("hidden" === getComputedStyle(e).visibility) return !0;
              var r = c.call(e, "details>summary:first-of-type")
                ? e.parentElement
                : e;
              if (c.call(r, "details:not([open]) *")) return !0;
              var o = d(e).host,
                a =
                  (null == o ? void 0 : o.ownerDocument.contains(o)) ||
                  e.ownerDocument.contains(e);
              if (i && "full" !== i) {
                if ("non-zero-area" === i) return m(e);
              } else {
                if ("function" == typeof n) {
                  for (var s = e; e; ) {
                    var l = e.parentElement,
                      u = d(e);
                    if (l && !l.shadowRoot && !0 === n(l)) return m(e);
                    e = e.assignedSlot
                      ? e.assignedSlot
                      : l || u === e.ownerDocument
                      ? l
                      : u.host;
                  }
                  e = s;
                }
                if (a) return !e.getClientRects().length;
              }
              return !1;
            })(t, e) ||
            (function (e) {
              return (
                "DETAILS" === e.tagName &&
                Array.prototype.slice.apply(e.children).some(function (e) {
                  return "SUMMARY" === e.tagName;
                })
              );
            })(t) ||
            (function (e) {
              if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
                for (var t = e.parentElement; t; ) {
                  if ("FIELDSET" === t.tagName && t.disabled) {
                    for (var i = 0; i < t.children.length; i++) {
                      var n = t.children.item(i);
                      if ("LEGEND" === n.tagName)
                        return (
                          !!c.call(t, "fieldset[disabled] *") || !n.contains(e)
                        );
                    }
                    return !0;
                  }
                  t = t.parentElement;
                }
              return !1;
            })(t)
          );
        },
        g = function (e, t) {
          return !(
            (function (e) {
              return (
                (function (e) {
                  return v(e) && "radio" === e.type;
                })(e) &&
                !(function (e) {
                  if (!e.name) return !0;
                  var t,
                    i = e.form || d(e),
                    n = function (e) {
                      return i.querySelectorAll(
                        'input[type="radio"][name="' + e + '"]'
                      );
                    };
                  if (
                    "undefined" != typeof window &&
                    void 0 !== window.CSS &&
                    "function" == typeof window.CSS.escape
                  )
                    t = n(window.CSS.escape(e.name));
                  else
                    try {
                      t = n(e.name);
                    } catch (e) {
                      return (
                        console.error(
                          "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
                          e.message
                        ),
                        !1
                      );
                    }
                  var r = (function (e, t) {
                    for (var i = 0; i < e.length; i++)
                      if (e[i].checked && e[i].form === t) return e[i];
                  })(t, e.form);
                  return !r || r === e;
                })(e)
              );
            })(t) ||
            h(t) < 0 ||
            !b(e, t)
          );
        },
        y = function (e) {
          var t = parseInt(e.getAttribute("tabindex"), 10);
          return !!(isNaN(t) || t >= 0);
        },
        x = function e(t) {
          var i = [],
            n = [];
          return (
            t.forEach(function (t, r) {
              var o = !!t.scope,
                a = o ? t.scope : t,
                s = h(a, o),
                l = o ? e(t.candidates) : a;
              0 === s
                ? o
                  ? i.push.apply(i, l)
                  : i.push(a)
                : n.push({
                    documentOrder: r,
                    tabIndex: s,
                    item: t,
                    isScope: o,
                    content: l,
                  });
            }),
            n
              .sort(_)
              .reduce(function (e, t) {
                return (
                  t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e
                );
              }, [])
              .concat(i)
          );
        },
        w = function (e, t) {
          var i;
          return (
            (i = (t = t || {}).getShadowRoot
              ? f([e], t.includeContainer, {
                  filter: g.bind(null, t),
                  flatten: !1,
                  getShadowRoot: t.getShadowRoot,
                  shadowRootFilter: y,
                })
              : p(e, t.includeContainer, g.bind(null, t))),
            x(i)
          );
        },
        $ = function (e, t) {
          return (t = t || {}).getShadowRoot
            ? f([e], t.includeContainer, {
                filter: b.bind(null, t),
                flatten: !0,
                getShadowRoot: t.getShadowRoot,
              })
            : p(e, t.includeContainer, b.bind(null, t));
        },
        O = function (e, t) {
          if (((t = t || {}), !e)) throw new Error("No node provided");
          return !1 !== c.call(e, l) && g(t, e);
        },
        A = s.concat("iframe").join(","),
        S = function (e, t) {
          if (((t = t || {}), !e)) throw new Error("No node provided");
          return !1 !== c.call(e, A) && b(t, e);
        };
      function E(e, t) {
        var i = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            i.push.apply(i, n);
        }
        return i;
      }
      function k(e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? E(Object(i), !0).forEach(function (t) {
                M(e, t, i[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
            : E(Object(i)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(i, t)
                );
              });
        }
        return e;
      }
      function M(e, t, i) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = i),
          e
        );
      }
      var D,
        C =
          ((D = []),
          {
            activateTrap: function (e) {
              if (D.length > 0) {
                var t = D[D.length - 1];
                t !== e && t.pause();
              }
              var i = D.indexOf(e);
              -1 === i || D.splice(i, 1), D.push(e);
            },
            deactivateTrap: function (e) {
              var t = D.indexOf(e);
              -1 !== t && D.splice(t, 1),
                D.length > 0 && D[D.length - 1].unpause();
            },
          }),
        T = function (e) {
          return setTimeout(e, 0);
        },
        I = function (e, t) {
          var i = -1;
          return (
            e.every(function (e, n) {
              return !t(e) || ((i = n), !1);
            }),
            i
          );
        },
        N = function (e) {
          for (
            var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1;
            n < t;
            n++
          )
            i[n - 1] = arguments[n];
          return "function" == typeof e ? e.apply(void 0, i) : e;
        },
        P = function (e) {
          return e.target.shadowRoot && "function" == typeof e.composedPath
            ? e.composedPath()[0]
            : e.target;
        };
      function j(e) {
        let t = [];
        return (
          Y(e, (e) => {
            let i = e.hasAttribute("aria-hidden");
            e.setAttribute("aria-hidden", "true"),
              t.push(() => i || e.removeAttribute("aria-hidden"));
          }),
          () => {
            for (; t.length; ) t.pop()();
          }
        );
      }
      function Y(e, t) {
        !e.isSameNode(document.body) &&
          e.parentNode &&
          Array.from(e.parentNode.children).forEach((i) => {
            i.isSameNode(e) ? Y(e.parentNode, t) : t(i);
          });
      }
      function K(e, t, i) {
        if (-1 === e.indexOf(t)) return i;
        const n = e[e.indexOf(t) + 1];
        if (!n) return i;
        if ("duration" === t) {
          let e = n.match(/([0-9]+)ms/);
          if (e) return e[1];
        }
        if ("min" === t) {
          let e = n.match(/([0-9]+)px/);
          if (e) return e[1];
        }
        return n;
      }
      function F(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return R(e);
          })(e) ||
          (function (e) {
            if (
              ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e["@@iterator"]
            )
              return Array.from(e);
          })(e) ||
          (function (e, t) {
            if (e) {
              if ("string" == typeof e) return R(e, t);
              var i = Object.prototype.toString.call(e).slice(8, -1);
              return (
                "Object" === i && e.constructor && (i = e.constructor.name),
                "Map" === i || "Set" === i
                  ? Array.from(e)
                  : "Arguments" === i ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                  ? R(e, t)
                  : void 0
              );
            }
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function R(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
        return n;
      }
      var B,
        H,
        V,
        W,
        z = !1,
        U = !1,
        q = [],
        Z = -1;
      function J(e) {
        let t = q.indexOf(e);
        -1 !== t && t > Z && q.splice(t, 1);
      }
      function G() {
        (z = !1), (U = !0);
        for (let e = 0; e < q.length; e++) q[e](), (Z = e);
        (q.length = 0), (Z = -1), (U = !1);
      }
      var Q = !0;
      function X(e) {
        H = e;
      }
      function ee(e, t, i = {}) {
        e.dispatchEvent(
          new CustomEvent(t, {
            detail: i,
            bubbles: !0,
            composed: !0,
            cancelable: !0,
          })
        );
      }
      function te(e, t) {
        if ("function" == typeof ShadowRoot && e instanceof ShadowRoot)
          return void Array.from(e.children).forEach((e) => te(e, t));
        let i = !1;
        if ((t(e, () => (i = !0)), i)) return;
        let n = e.firstElementChild;
        for (; n; ) te(n, t), (n = n.nextElementSibling);
      }
      function ie(e, ...t) {
        var i;
        (i = console).warn.apply(i, [`Alpine Warning: ${e}`].concat(t));
      }
      var ne = !1,
        re = [],
        oe = [];
      function ae() {
        return re.map((e) => e());
      }
      function se() {
        return re.concat(oe).map((e) => e());
      }
      function le(e) {
        re.push(e);
      }
      function ue(e) {
        oe.push(e);
      }
      function ce(e, t = !1) {
        return de(e, (e) => {
          if ((t ? se() : ae()).some((t) => e.matches(t))) return !0;
        });
      }
      function de(e, t) {
        if (e) {
          if (t(e)) return e;
          if ((e._x_teleportBack && (e = e._x_teleportBack), e.parentElement))
            return de(e.parentElement, t);
        }
      }
      var pe = [];
      function fe(e, t = te, i = () => {}) {
        !(function (n) {
          rt = !0;
          let r = Symbol();
          (at = r), ot.set(r, []);
          let o = () => {
            for (; ot.get(r).length; ) ot.get(r).shift()();
            ot.delete(r);
          };
          t(e, (e, t) => {
            i(e, t),
              pe.forEach((i) => i(e, t)),
              it(e, e.attributes).forEach((e) => e()),
              e._x_ignore && t();
          }),
            (rt = !1),
            o();
        })();
      }
      function he(e) {
        te(e, (e) => {
          xe(e),
            (function (e) {
              if (e._x_cleanups)
                for (; e._x_cleanups.length; ) e._x_cleanups.pop()();
            })(e);
        });
      }
      var _e = [],
        ve = [],
        me = [];
      function be(e, t) {
        "function" == typeof t
          ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
          : ((t = e), ve.push(t));
      }
      function ge(e) {
        _e.push(e);
      }
      function ye(e, t, i) {
        e._x_attributeCleanups || (e._x_attributeCleanups = {}),
          e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
          e._x_attributeCleanups[t].push(i);
      }
      function xe(e, t) {
        e._x_attributeCleanups &&
          Object.entries(e._x_attributeCleanups).forEach(([i, n]) => {
            (void 0 === t || t.includes(i)) &&
              (n.forEach((e) => e()), delete e._x_attributeCleanups[i]);
          });
      }
      var we = new MutationObserver(Ce),
        $e = !1;
      function Oe() {
        we.observe(document, {
          subtree: !0,
          childList: !0,
          attributes: !0,
          attributeOldValue: !0,
        }),
          ($e = !0);
      }
      function Ae() {
        (Se = Se.concat(we.takeRecords())).length &&
          !Ee &&
          ((Ee = !0),
          queueMicrotask(() => {
            Ce(Se), (Se.length = 0), (Ee = !1);
          })),
          we.disconnect(),
          ($e = !1);
      }
      var Se = [],
        Ee = !1;
      function ke(e) {
        if (!$e) return e();
        Ae();
        let t = e();
        return Oe(), t;
      }
      var Me = !1,
        De = [];
      function Ce(e) {
        if (Me) return void (De = De.concat(e));
        let t = [],
          i = [],
          n = new Map(),
          r = new Map();
        for (let o = 0; o < e.length; o++)
          if (
            !e[o].target._x_ignoreMutationObserver &&
            ("childList" === e[o].type &&
              (e[o].addedNodes.forEach((e) => 1 === e.nodeType && t.push(e)),
              e[o].removedNodes.forEach((e) => 1 === e.nodeType && i.push(e))),
            "attributes" === e[o].type)
          ) {
            let t = e[o].target,
              i = e[o].attributeName,
              a = e[o].oldValue,
              s = () => {
                n.has(t) || n.set(t, []),
                  n.get(t).push({ name: i, value: t.getAttribute(i) });
              },
              l = () => {
                r.has(t) || r.set(t, []), r.get(t).push(i);
              };
            t.hasAttribute(i) && null === a
              ? s()
              : t.hasAttribute(i)
              ? (l(), s())
              : l();
          }
        r.forEach((e, t) => {
          xe(t, e);
        }),
          n.forEach((e, t) => {
            _e.forEach((i) => i(t, e));
          });
        for (let e of i) t.includes(e) || (ve.forEach((t) => t(e)), he(e));
        t.forEach((e) => {
          (e._x_ignoreSelf = !0), (e._x_ignore = !0);
        });
        for (let e of t)
          i.includes(e) ||
            (e.isConnected &&
              (delete e._x_ignoreSelf,
              delete e._x_ignore,
              me.forEach((t) => t(e)),
              (e._x_ignore = !0),
              (e._x_ignoreSelf = !0)));
        t.forEach((e) => {
          delete e._x_ignoreSelf, delete e._x_ignore;
        }),
          (t = null),
          (i = null),
          (n = null),
          (r = null);
      }
      function Te(e) {
        return Ne(Ie(e));
      }
      function Le(e, t, i) {
        return (
          (e._x_dataStack = [t].concat(F(Ie(i || e)))),
          () => {
            e._x_dataStack = e._x_dataStack.filter((e) => e !== t);
          }
        );
      }
      function Ie(e) {
        return e._x_dataStack
          ? e._x_dataStack
          : "function" == typeof ShadowRoot && e instanceof ShadowRoot
          ? Ie(e.host)
          : e.parentNode
          ? Ie(e.parentNode)
          : [];
      }
      function Ne(e) {
        let t = new Proxy(
          {},
          {
            ownKeys: () =>
              Array.from(new Set(e.flatMap((e) => Object.keys(e)))),
            has: (t, i) => e.some((e) => e.hasOwnProperty(i)),
            get: (i, n) =>
              (e.find((e) => {
                if (e.hasOwnProperty(n)) {
                  let i = Object.getOwnPropertyDescriptor(e, n);
                  if (
                    (i.get && i.get._x_alreadyBound) ||
                    (i.set && i.set._x_alreadyBound)
                  )
                    return !0;
                  if ((i.get || i.set) && i.enumerable) {
                    let r = i.get,
                      o = i.set,
                      a = i;
                    (r = r && r.bind(t)),
                      (o = o && o.bind(t)),
                      r && (r._x_alreadyBound = !0),
                      o && (o._x_alreadyBound = !0),
                      Object.defineProperty(e, n, { ...a, get: r, set: o });
                  }
                  return !0;
                }
                return !1;
              }) || {})[n],
            set: (t, i, n) => {
              let r = e.find((e) => e.hasOwnProperty(i));
              return r ? (r[i] = n) : (e[e.length - 1][i] = n), !0;
            },
          }
        );
        return t;
      }
      function Pe(e) {
        let t = (i, n = "") => {
          Object.entries(Object.getOwnPropertyDescriptors(i)).forEach(
            ([r, { value: o, enumerable: a }]) => {
              if (!1 === a || void 0 === o) return;
              let s = "" === n ? r : `${n}.${r}`;
              var l;
              "object" == typeof o && null !== o && o._x_interceptor
                ? (i[r] = o.initialize(e, s, r))
                : "object" != typeof (l = o) ||
                  Array.isArray(l) ||
                  null === l ||
                  o === i ||
                  o instanceof Element ||
                  t(o, s);
            }
          );
        };
        return t(e);
      }
      function je(e, t = () => {}) {
        let i = {
          initialValue: void 0,
          _x_interceptor: !0,
          initialize(t, i, n) {
            return e(
              this.initialValue,
              () =>
                (function (e, t) {
                  return t.split(".").reduce((e, t) => e[t], e);
                })(t, i),
              (e) => Ye(t, i, e),
              i,
              n
            );
          },
        };
        return (
          t(i),
          (e) => {
            if ("object" == typeof e && null !== e && e._x_interceptor) {
              let t = i.initialize.bind(i);
              i.initialize = (n, r, o) => {
                let a = e.initialize(n, r, o);
                return (i.initialValue = a), t(n, r, o);
              };
            } else i.initialValue = e;
            return i;
          }
        );
      }
      function Ye(e, t, i) {
        if (("string" == typeof t && (t = t.split(".")), 1 !== t.length)) {
          if (0 === t.length) throw error;
          return e[t[0]] || (e[t[0]] = {}), Ye(e[t[0]], t.slice(1), i);
        }
        e[t[0]] = i;
      }
      var Ke = {};
      function Fe(e, t) {
        Ke[e] = t;
      }
      function Re(e, t) {
        return (
          Object.entries(Ke).forEach(([i, n]) => {
            let r = null;
            Object.defineProperty(e, `$${i}`, {
              get: () =>
                n(
                  t,
                  (function () {
                    if (r) return r;
                    {
                      let [e, i] = st(t);
                      return (r = { interceptor: je, ...e }), be(t, i), r;
                    }
                  })()
                ),
              enumerable: !1,
            });
          }),
          e
        );
      }
      function Be(e, t, i, ...n) {
        try {
          return i.apply(void 0, n);
        } catch (i) {}
      }
      var Ve = !0;
      function We(e) {
        let t = Ve;
        Ve = !1;
        let i = e();
        return (Ve = t), i;
      }
      function ze(e, t, i = {}) {
        let n;
        return Ue(e, t)((e) => (n = e), i), n;
      }
      function Ue(...e) {
        return qe.apply(void 0, e);
      }
      var qe = Ze;
      function Ze(e, t) {
        let i = {};
        Re(i, e);
        let n = [i].concat(F(Ie(e))),
          r =
            "function" == typeof t
              ? (function (e, t) {
                  return (
                    i = () => {},
                    { scope: n = {}, params: r = [] } = {}
                  ) => {
                    Ge(i, t.apply(Ne([n].concat(F(e))), r));
                  };
                })(n, t)
              : (function (e, t, i) {
                  let n = (function (e, t) {
                    if (Je[e]) return Je[e];
                    let i = Object.getPrototypeOf(
                        async function () {}
                      ).constructor,
                      n =
                        /^[\n\s]*if.*\(.*\)/.test(e.trim()) ||
                        /^(let|const)\s/.test(e.trim())
                          ? `(async()=>{ ${e} })()`
                          : e;
                    let r = (() => {
                      try {
                        return new i(
                          ["__self", "scope"],
                          `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
                        );
                      } catch (i) {
                        return He(i, t, e), Promise.resolve();
                      }
                    })();
                    return (Je[e] = r), r;
                  })(t, i);
                  return (
                    r = () => {},
                    { scope: o = {}, params: a = [] } = {}
                  ) => {
                    (n.result = void 0), (n.finished = !1);
                    let s = Ne([o].concat(F(e)));
                    if ("function" == typeof n) {
                      let e = n(n, s).catch((e) => (e, i, t));
                      n.finished
                        ? (Ge(r, n.result, s, a, i), (n.result = void 0))
                        : e
                            .then((e) => {
                              Ge(r, e, s, a, i);
                            })
                            .finally(() => (n.result = void 0));
                    }
                  };
                })(n, t, e);
        return Be.bind(null, e, t, r);
      }
      var Je = {};
      function Ge(e, t, i, n, r) {
        if (Ve && "function" == typeof t) {
          let o = t.apply(i, n);
          o instanceof Promise
            ? o.then((t) => Ge(e, t, i, n)).catch((e) => He(e, r, t))
            : e(o);
        } else
          "object" == typeof t && t instanceof Promise
            ? t.then((t) => e(t))
            : e(t);
      }
      var Qe = "x-";
      function Xe(e = "") {
        return Qe + e;
      }
      var et = {};
      function tt(e, t) {
        return (
          (et[e] = t),
          {
            before(t) {
              if (!et[t])
                return void console.warn(
                  "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
                );
              const i = _t.indexOf(t);
              _t.splice(i >= 0 ? i : _t.indexOf("DEFAULT"), 0, e);
            },
          }
        );
      }
      function it(e, t, i) {
        if (((t = Array.from(t)), e._x_virtualDirectives)) {
          let i = Object.entries(e._x_virtualDirectives).map(([e, t]) => ({
              name: e,
              value: t,
            })),
            n = nt(i);
          (i = i.map((e) =>
            n.find((t) => t.name === e.name)
              ? { name: `x-bind:${e.name}`, value: `"${e.value}"` }
              : e
          )),
            (t = t.concat(i));
        }
        let n = {},
          r = t
            .map(ut((e, t) => (n[e] = t)))
            .filter(pt)
            .map(
              (function (e, t) {
                return ({ name: i, value: n }) => {
                  let r = i.match(ft()),
                    o = i.match(/:([a-zA-Z0-9\-:]+)/),
                    a = i.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                    s = t || e[i] || i;
                  return {
                    type: r ? r[1] : null,
                    value: o ? o[1] : null,
                    modifiers: a.map((e) => e.replace(".", "")),
                    expression: n,
                    original: s,
                  };
                };
              })(n, i)
            )
            .sort(vt);
        return r.map((t) =>
          (function (e, t) {
            let i = et[t.type] || (() => {}),
              [n, r] = st(e);
            ye(e, t.original, r);
            let o = () => {
              e._x_ignore ||
                e._x_ignoreSelf ||
                (i.inline && i.inline(e, t, n),
                (i = i.bind(i, e, t, n)),
                rt ? ot.get(at).push(i) : i());
            };
            return (o.runCleanups = r), o;
          })(e, t)
        );
      }
      function nt(e) {
        return Array.from(e)
          .map(ut())
          .filter((e) => !pt(e));
      }
      var rt = !1,
        ot = new Map(),
        at = Symbol();
      function st(e) {
        let t = [],
          [i, n] = (function (e) {
            let t = () => {};
            return [
              (i) => {
                let n = H(i);
                return (
                  e._x_effects ||
                    ((e._x_effects = new Set()),
                    (e._x_runEffects = () => {
                      e._x_effects.forEach((e) => e());
                    })),
                  e._x_effects.add(n),
                  (t = () => {
                    void 0 !== n && (e._x_effects.delete(n), V(n));
                  }),
                  n
                );
              },
              () => {
                t();
              },
            ];
          })(e);
        return (
          t.push(n),
          [
            {
              Alpine: zt,
              effect: i,
              cleanup: (e) => t.push(e),
              evaluateLater: Ue.bind(Ue, e),
              evaluate: ze.bind(ze, e),
            },
            () => t.forEach((e) => e()),
          ]
        );
      }
      var lt =
        (e, t) =>
        ({ name: i, value: n }) => (
          i.startsWith(e) && (i = i.replace(e, t)), { name: i, value: n }
        );
      function ut(e = () => {}) {
        return ({ name: t, value: i }) => {
          let { name: n, value: r } = ct.reduce((e, t) => t(e), {
            name: t,
            value: i,
          });
          return n !== t && e(n, t), { name: n, value: r };
        };
      }
      var ct = [];
      function dt(e) {
        ct.push(e);
      }
      function pt({ name: e }) {
        return ft().test(e);
      }
      var ft = () => new RegExp(`^${Qe}([^:^.]+)\\b`),
        ht = "DEFAULT",
        _t = [
          "ignore",
          "ref",
          "data",
          "id",
          "bind",
          "init",
          "for",
          "model",
          "modelable",
          "transition",
          "show",
          "if",
          ht,
          "teleport",
        ];
      function vt(e, t) {
        let i = -1 === _t.indexOf(e.type) ? ht : e.type,
          n = -1 === _t.indexOf(t.type) ? ht : t.type;
        return _t.indexOf(i) - _t.indexOf(n);
      }
      var mt = [],
        bt = !1;
      function gt(e = () => {}) {
        return (
          queueMicrotask(() => {
            bt ||
              setTimeout(() => {
                yt();
              });
          }),
          new Promise((t) => {
            mt.push(() => {
              e(), t();
            });
          })
        );
      }
      function yt() {
        for (bt = !1; mt.length; ) mt.shift()();
      }
      function xt(e, t) {
        return Array.isArray(t)
          ? wt(e, t.join(" "))
          : "object" == typeof t && null !== t
          ? (function (e, t) {
              let i = (e) => e.split(" ").filter(Boolean),
                n = Object.entries(t)
                  .flatMap(([e, t]) => !!t && i(e))
                  .filter(Boolean),
                r = Object.entries(t)
                  .flatMap(([e, t]) => !t && i(e))
                  .filter(Boolean),
                o = [],
                a = [];
              return (
                r.forEach((t) => {
                  e.classList.contains(t) && (e.classList.remove(t), a.push(t));
                }),
                n.forEach((t) => {
                  e.classList.contains(t) || (e.classList.add(t), o.push(t));
                }),
                () => {
                  a.forEach((t) => e.classList.add(t)),
                    o.forEach((t) => e.classList.remove(t));
                }
              );
            })(e, t)
          : "function" == typeof t
          ? xt(e, t())
          : wt(e, t);
      }
      function wt(e, t) {
        return (
          (t = !0 === t ? (t = "") : t || ""),
          (i = t
            .split(" ")
            .filter((t) => !e.classList.contains(t))
            .filter(Boolean)),
          (n = e.classList).add.apply(n, F(i)),
          () => {
            var t;
            (t = e.classList).remove.apply(t, F(i));
          }
        );
        var i, n;
      }
      function $t(e, t) {
        return "object" == typeof t && null !== t
          ? (function (e, t) {
              let i = {};
              return (
                Object.entries(t).forEach(([t, n]) => {
                  (i[t] = e.style[t]),
                    t.startsWith("--") ||
                      (t = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()),
                    e.style.setProperty(t, n);
                }),
                setTimeout(() => {
                  0 === e.style.length && e.removeAttribute("style");
                }),
                () => {
                  $t(e, i);
                }
              );
            })(e, t)
          : (function (e, t) {
              let i = e.getAttribute("style", t);
              return (
                e.setAttribute("style", t),
                () => {
                  e.setAttribute("style", i || "");
                }
              );
            })(e, t);
      }
      function Ot(e, t = () => {}) {
        let i = !1;
        return function () {
          i ? t.apply(this, arguments) : ((i = !0), e.apply(this, arguments));
        };
      }
      function At(e, t, i = {}) {
        e._x_transition ||
          (e._x_transition = {
            enter: { during: i, start: i, end: i },
            leave: { during: i, start: i, end: i },
            in(i = () => {}, n = () => {}) {
              Et(
                e,
                t,
                {
                  during: this.enter.during,
                  start: this.enter.start,
                  end: this.enter.end,
                },
                i,
                n
              );
            },
            out(i = () => {}, n = () => {}) {
              Et(
                e,
                t,
                {
                  during: this.leave.during,
                  start: this.leave.start,
                  end: this.leave.end,
                },
                i,
                n
              );
            },
          });
      }
      function St(e) {
        let t = e.parentNode;
        if (t) return t._x_hidePromise ? t : St(t);
      }
      function Et(
        e,
        t,
        { during: i, start: n, end: r } = {},
        o = () => {},
        a = () => {}
      ) {
        if (
          (e._x_transitioning && e._x_transitioning.cancel(),
          0 === Object.keys(i).length &&
            0 === Object.keys(n).length &&
            0 === Object.keys(r).length)
        )
          return o(), void a();
        let s, l, u;
        !(function (e, t) {
          let i,
            n,
            r,
            o = Ot(() => {
              ke(() => {
                (i = !0),
                  n || t.before(),
                  r || (t.end(), yt()),
                  t.after(),
                  e.isConnected && t.cleanup(),
                  delete e._x_transitioning;
              });
            });
          (e._x_transitioning = {
            beforeCancels: [],
            beforeCancel(e) {
              this.beforeCancels.push(e);
            },
            cancel: Ot(function () {
              for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
              o();
            }),
            finish: o,
          }),
            ke(() => {
              t.start(), t.during();
            }),
            (bt = !0),
            requestAnimationFrame(() => {
              if (i) return;
              let o =
                  1e3 *
                  Number(
                    getComputedStyle(e)
                      .transitionDuration.replace(/,.*/, "")
                      .replace("s", "")
                  ),
                a =
                  1e3 *
                  Number(
                    getComputedStyle(e)
                      .transitionDelay.replace(/,.*/, "")
                      .replace("s", "")
                  );
              0 === o &&
                (o =
                  1e3 *
                  Number(
                    getComputedStyle(e).animationDuration.replace("s", "")
                  )),
                ke(() => {
                  t.before();
                }),
                (n = !0),
                requestAnimationFrame(() => {
                  i ||
                    (ke(() => {
                      t.end();
                    }),
                    yt(),
                    setTimeout(e._x_transitioning.finish, o + a),
                    (r = !0));
                });
            });
        })(e, {
          start() {
            s = t(e, n);
          },
          during() {
            l = t(e, i);
          },
          before: o,
          end() {
            s(), (u = t(e, r));
          },
          after: a,
          cleanup() {
            l(), u();
          },
        });
      }
      function kt(e, t, i) {
        if (-1 === e.indexOf(t)) return i;
        const n = e[e.indexOf(t) + 1];
        if (!n) return i;
        if ("scale" === t && isNaN(n)) return i;
        if ("duration" === t || "delay" === t) {
          let e = n.match(/([0-9]+)ms/);
          if (e) return e[1];
        }
        return "origin" === t &&
          ["top", "right", "left", "center", "bottom"].includes(
            e[e.indexOf(t) + 2]
          )
          ? [n, e[e.indexOf(t) + 2]].join(" ")
          : n;
      }
      tt(
        "transition",
        (e, { value: t, modifiers: i, expression: n }, { evaluate: r }) => {
          "function" == typeof n && (n = r(n)),
            !1 !== n &&
              (n && "boolean" != typeof n
                ? (function (e, t, i) {
                    At(e, xt, ""),
                      {
                        enter: (t) => {
                          e._x_transition.enter.during = t;
                        },
                        "enter-start": (t) => {
                          e._x_transition.enter.start = t;
                        },
                        "enter-end": (t) => {
                          e._x_transition.enter.end = t;
                        },
                        leave: (t) => {
                          e._x_transition.leave.during = t;
                        },
                        "leave-start": (t) => {
                          e._x_transition.leave.start = t;
                        },
                        "leave-end": (t) => {
                          e._x_transition.leave.end = t;
                        },
                      }[i](t);
                  })(e, n, t)
                : (function (e, t, i) {
                    At(e, $t);
                    let n = !t.includes("in") && !t.includes("out") && !i,
                      r = n || t.includes("in") || ["enter"].includes(i),
                      o = n || t.includes("out") || ["leave"].includes(i);
                    t.includes("in") &&
                      !n &&
                      (t = t.filter((e, i) => i < t.indexOf("out"))),
                      t.includes("out") &&
                        !n &&
                        (t = t.filter((e, i) => i > t.indexOf("out")));
                    let a = !t.includes("opacity") && !t.includes("scale"),
                      s = a || t.includes("opacity") ? 0 : 1,
                      l =
                        a || t.includes("scale") ? kt(t, "scale", 95) / 100 : 1,
                      u = kt(t, "delay", 0) / 1e3,
                      c = kt(t, "origin", "center"),
                      d = "opacity, transform",
                      p = kt(t, "duration", 150) / 1e3,
                      f = kt(t, "duration", 75) / 1e3,
                      h = "cubic-bezier(0.4, 0.0, 0.2, 1)";
                    r &&
                      ((e._x_transition.enter.during = {
                        transformOrigin: c,
                        transitionDelay: `${u}s`,
                        transitionProperty: d,
                        transitionDuration: `${p}s`,
                        transitionTimingFunction: h,
                      }),
                      (e._x_transition.enter.start = {
                        opacity: s,
                        transform: `scale(${l})`,
                      }),
                      (e._x_transition.enter.end = {
                        opacity: 1,
                        transform: "scale(1)",
                      })),
                      o &&
                        ((e._x_transition.leave.during = {
                          transformOrigin: c,
                          transitionDelay: `${u}s`,
                          transitionProperty: d,
                          transitionDuration: `${f}s`,
                          transitionTimingFunction: h,
                        }),
                        (e._x_transition.leave.start = {
                          opacity: 1,
                          transform: "scale(1)",
                        }),
                        (e._x_transition.leave.end = {
                          opacity: s,
                          transform: `scale(${l})`,
                        }));
                  })(e, i, t));
        }
      ),
        (window.Element.prototype._x_toggleAndCascadeWithTransitions =
          function (e, t, i, n) {
            const r =
              "visible" === document.visibilityState
                ? requestAnimationFrame
                : setTimeout;
            let o = () => r(i);
            t
              ? e._x_transition &&
                (e._x_transition.enter || e._x_transition.leave)
                ? e._x_transition.enter &&
                  (Object.entries(e._x_transition.enter.during).length ||
                    Object.entries(e._x_transition.enter.start).length ||
                    Object.entries(e._x_transition.enter.end).length)
                  ? e._x_transition.in(i)
                  : o()
                : e._x_transition
                ? e._x_transition.in(i)
                : o()
              : ((e._x_hidePromise = e._x_transition
                  ? new Promise((t, i) => {
                      e._x_transition.out(
                        () => {},
                        () => t(n)
                      ),
                        e._x_transitioning.beforeCancel(() =>
                          i({ isFromCancelledTransition: !0 })
                        );
                    })
                  : Promise.resolve(n)),
                queueMicrotask(() => {
                  let t = St(e);
                  t
                    ? (t._x_hideChildren || (t._x_hideChildren = []),
                      t._x_hideChildren.push(e))
                    : r(() => {
                        let t = (e) => {
                          let i = Promise.all(
                            [e._x_hidePromise].concat(
                              F((e._x_hideChildren || []).map(t))
                            )
                          ).then(([e]) => e());
                          return (
                            delete e._x_hidePromise, delete e._x_hideChildren, i
                          );
                        };
                        t(e).catch((e) => {
                          if (!e.isFromCancelledTransition) throw e;
                        });
                      });
                }));
          });
      var Mt = !1;
      function Dt(e, t = () => {}) {
        return (...i) => (Mt ? t.apply(void 0, i) : e.apply(void 0, i));
      }
      var Ct = !1;
      function Tt(e) {
        let t = H;
        X((e, i) => {
          let n = t(e);
          return V(n), () => {};
        }),
          e(),
          X(t);
      }
      function Lt(e, t, i, n = []) {
        switch (
          (e._x_bindings || (e._x_bindings = B({})),
          (e._x_bindings[t] = i),
          (t = n.includes("camel")
            ? t.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase())
            : t))
        ) {
          case "value":
            !(function (e, t) {
              if ("radio" === e.type)
                void 0 === e.attributes.value && (e.value = t),
                  window.fromModel && (e.checked = Nt(e.value, t));
              else if ("checkbox" === e.type)
                Number.isInteger(t)
                  ? (e.value = t)
                  : Array.isArray(t) ||
                    "boolean" == typeof t ||
                    [null, void 0].includes(t)
                  ? Array.isArray(t)
                    ? (e.checked = t.some((t) => Nt(t, e.value)))
                    : (e.checked = !!t)
                  : (e.value = String(t));
              else if ("SELECT" === e.tagName)
                !(function (e, t) {
                  const i = [].concat(t).map((e) => e + "");
                  Array.from(e.options).forEach((e) => {
                    e.selected = i.includes(e.value);
                  });
                })(e, t);
              else {
                if (e.value === t) return;
                e.value = void 0 === t ? "" : t;
              }
            })(e, i);
            break;
          case "style":
            !(function (e, t) {
              e._x_undoAddedStyles && e._x_undoAddedStyles(),
                (e._x_undoAddedStyles = $t(e, t));
            })(e, i);
            break;
          case "class":
            !(function (e, t) {
              e._x_undoAddedClasses && e._x_undoAddedClasses(),
                (e._x_undoAddedClasses = xt(e, t));
            })(e, i);
            break;
          case "selected":
          case "checked":
            !(function (e, t, i) {
              It(e, t, i),
                (function (e, t, i) {
                  e[t] !== i && (e[t] = i);
                })(e, t, i);
            })(e, t, i);
            break;
          default:
            It(e, t, i);
        }
      }
      function It(e, t, i) {
        [null, void 0, !1].includes(i) &&
        (function (e) {
          return ![
            "aria-pressed",
            "aria-checked",
            "aria-expanded",
            "aria-selected",
          ].includes(e);
        })(t)
          ? e.removeAttribute(t)
          : (Pt(t) && (i = t),
            (function (e, t, i) {
              e.getAttribute(t) != i && e.setAttribute(t, i);
            })(e, t, i));
      }
      function Nt(e, t) {
        return e == t;
      }
      function Pt(e) {
        return [
          "disabled",
          "checked",
          "required",
          "readonly",
          "hidden",
          "open",
          "selected",
          "autofocus",
          "itemscope",
          "multiple",
          "novalidate",
          "allowfullscreen",
          "allowpaymentrequest",
          "formnovalidate",
          "autoplay",
          "controls",
          "loop",
          "muted",
          "playsinline",
          "default",
          "ismap",
          "reversed",
          "async",
          "defer",
          "nomodule",
        ].includes(e);
      }
      function jt(e, t, i) {
        let n = e.getAttribute(t);
        return null === n
          ? "function" == typeof i
            ? i()
            : i
          : "" === n || (Pt(t) ? !![t, "true"].includes(n) : n);
      }
      function Yt(e, t) {
        var i;
        return function () {
          var n = this,
            r = arguments;
          clearTimeout(i),
            (i = setTimeout(function () {
              (i = null), e.apply(n, r);
            }, t));
        };
      }
      function Kt(e, t) {
        let i;
        return function () {
          let n = arguments;
          i || (e.apply(this, n), (i = !0), setTimeout(() => (i = !1), t));
        };
      }
      function Ft({ get: e, set: t }, { get: i, set: n }) {
        let r,
          o,
          a,
          s,
          l = !0,
          u = H(() => {
            let u, c;
            l
              ? ((u = e()),
                n(JSON.parse(JSON.stringify(u))),
                (c = i()),
                (l = !1))
              : ((u = e()),
                (c = i()),
                (a = JSON.stringify(u)),
                (s = JSON.stringify(c)),
                a !== r
                  ? ((c = i()), n(u), (c = u))
                  : (t(JSON.parse(s ?? null)), (u = c))),
              (r = JSON.stringify(u)),
              (o = JSON.stringify(c));
          });
        return () => {
          V(u);
        };
      }
      var Rt = {},
        Bt = !1,
        Ht = {};
      function Vt(e, t, i) {
        let n = [];
        for (; n.length; ) n.pop()();
        let r = Object.entries(t).map(([e, t]) => ({ name: e, value: t })),
          o = nt(r);
        return (
          (r = r.map((e) =>
            o.find((t) => t.name === e.name)
              ? { name: `x-bind:${e.name}`, value: `"${e.value}"` }
              : e
          )),
          it(e, r, i).map((e) => {
            n.push(e.runCleanups), e();
          }),
          () => {
            for (; n.length; ) n.pop()();
          }
        );
      }
      var Wt = {},
        zt = {
          get reactive() {
            return B;
          },
          get release() {
            return V;
          },
          get effect() {
            return H;
          },
          get raw() {
            return W;
          },
          version: "3.13.0",
          flushAndStopDeferringMutations: function () {
            (Me = !1), Ce(De), (De = []);
          },
          dontAutoEvaluateFunctions: We,
          disableEffectScheduling: function (e) {
            (Q = !1), e(), (Q = !0);
          },
          startObservingMutations: Oe,
          stopObservingMutations: Ae,
          setReactivityEngine: function (e) {
            (B = e.reactive),
              (V = e.release),
              (H = (t) =>
                e.effect(t, {
                  scheduler: (e) => {
                    Q
                      ? (function (e) {
                          var t;
                          (t = e),
                            q.includes(t) || q.push(t),
                            U || z || ((z = !0), queueMicrotask(G));
                        })(e)
                      : e();
                  },
                })),
              (W = e.raw);
          },
          onAttributeRemoved: ye,
          onAttributesAdded: ge,
          closestDataStack: Ie,
          skipDuringClone: Dt,
          onlyDuringClone: function (e) {
            return (...t) => Mt && e.apply(void 0, t);
          },
          addRootSelector: le,
          addInitSelector: ue,
          addScopeToNode: Le,
          deferMutations: function () {
            Me = !0;
          },
          mapAttributes: dt,
          evaluateLater: Ue,
          interceptInit: function (e) {
            pe.push(e);
          },
          setEvaluator: function (e) {
            qe = e;
          },
          mergeProxies: Ne,
          extractProp: function (e, t, i, n = !0) {
            if (e._x_bindings && void 0 !== e._x_bindings[t])
              return e._x_bindings[t];
            if (e._x_inlineBindings && void 0 !== e._x_inlineBindings[t]) {
              let i = e._x_inlineBindings[t];
              return (i.extract = n), We(() => ze(e, i.expression));
            }
            return jt(e, t, i);
          },
          findClosest: de,
          onElRemoved: be,
          closestRoot: ce,
          destroyTree: he,
          interceptor: je,
          transition: Et,
          setStyles: $t,
          mutateDom: ke,
          directive: tt,
          entangle: Ft,
          throttle: Kt,
          debounce: Yt,
          evaluate: ze,
          initTree: fe,
          nextTick: gt,
          prefixed: Xe,
          prefix: function (e) {
            Qe = e;
          },
          plugin: function (e) {
            (Array.isArray(e) ? e : [e]).forEach((e) => e(zt));
          },
          magic: Fe,
          store: function (e, t) {
            if ((Bt || ((Rt = B(Rt)), (Bt = !0)), void 0 === t)) return Rt[e];
            (Rt[e] = t),
              "object" == typeof t &&
                null !== t &&
                t.hasOwnProperty("init") &&
                "function" == typeof t.init &&
                Rt[e].init(),
              Pe(Rt[e]);
          },
          start: function () {
            var e;
            ne &&
              ie(
                "Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."
              ),
              (ne = !0),
              document.body ||
                ie(
                  "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
                ),
              ee(document, "alpine:init"),
              ee(document, "alpine:initializing"),
              Oe(),
              (e = (e) => fe(e, te)),
              me.push(e),
              be((e) => he(e)),
              ge((e, t) => {
                it(e, t).forEach((e) => e());
              }),
              Array.from(document.querySelectorAll(se()))
                .filter((e) => !ce(e.parentElement, !0))
                .forEach((e) => {
                  fe(e);
                }),
              ee(document, "alpine:initialized");
          },
          clone: function (e, t) {
            t._x_dataStack || (t._x_dataStack = e._x_dataStack),
              (Mt = !0),
              (Ct = !0),
              Tt(() => {
                !(function (e) {
                  let t = !1;
                  fe(e, (e, i) => {
                    te(e, (e, n) => {
                      if (
                        t &&
                        (function (e) {
                          return ae().some((t) => e.matches(t));
                        })(e)
                      )
                        return n();
                      (t = !0), i(e, n);
                    });
                  });
                })(t);
              }),
              (Mt = !1),
              (Ct = !1);
          },
          cloneNode: function (e, t) {
            e._x_dataStack &&
              ((t._x_dataStack = e._x_dataStack),
              t.setAttribute("data-has-alpine-state", !0)),
              (Mt = !0),
              Tt(() => {
                fe(t, (e, t) => {
                  t(e, () => {});
                });
              }),
              (Mt = !1);
          },
          bound: function (e, t, i) {
            return e._x_bindings && void 0 !== e._x_bindings[t]
              ? e._x_bindings[t]
              : jt(e, t, i);
          },
          $data: Te,
          walk: te,
          data: function (e, t) {
            Wt[e] = t;
          },
          bind: function (e, t) {
            let i = "function" != typeof t ? () => t : t;
            return e instanceof Element ? Vt(e, i()) : ((Ht[e] = i), () => {});
          },
        };
      function Ut(e, t) {
        const i = Object.create(null),
          n = e.split(",");
        for (let e = 0; e < n.length; e++) i[n[e]] = !0;
        return t ? (e) => !!i[e.toLowerCase()] : (e) => !!i[e];
      }
      var qt,
        Zt = Object.freeze({}),
        Jt = (Object.freeze([]), Object.prototype.hasOwnProperty),
        Gt = (e, t) => Jt.call(e, t),
        Qt = Array.isArray,
        Xt = (e) => "[object Map]" === ni(e),
        ei = (e) => "symbol" == typeof e,
        ti = (e) => null !== e && "object" == typeof e,
        ii = Object.prototype.toString,
        ni = (e) => ii.call(e),
        ri = (e) => ni(e).slice(8, -1),
        oi = (e) =>
          "string" == typeof e &&
          "NaN" !== e &&
          "-" !== e[0] &&
          "" + parseInt(e, 10) === e,
        ai = (e) => {
          const t = Object.create(null);
          return (i) => t[i] || (t[i] = e(i));
        },
        si = /-(\w)/g,
        li =
          (ai((e) => e.replace(si, (e, t) => (t ? t.toUpperCase() : ""))),
          /\B([A-Z])/g),
        ui =
          (ai((e) => e.replace(li, "-$1").toLowerCase()),
          ai((e) => e.charAt(0).toUpperCase() + e.slice(1))),
        ci =
          (ai((e) => (e ? `on${ui(e)}` : "")),
          (e, t) => e !== t && (e == e || t == t)),
        di = new WeakMap(),
        pi = [],
        fi = Symbol("iterate"),
        hi = Symbol("Map key iterate"),
        _i = 0;
      function vi(e) {
        const { deps: t } = e;
        if (t.length) {
          for (let i = 0; i < t.length; i++) t[i].delete(e);
          t.length = 0;
        }
      }
      var mi = !0,
        bi = [];
      function gi() {
        const e = bi.pop();
        mi = void 0 === e || e;
      }
      function yi(e, t, i) {
        if (!mi || void 0 === qt) return;
        let n = di.get(e);
        n || di.set(e, (n = new Map()));
        let r = n.get(i);
        r || n.set(i, (r = new Set())),
          r.has(qt) ||
            (r.add(qt),
            qt.deps.push(r),
            qt.options.onTrack &&
              qt.options.onTrack({ effect: qt, target: e, type: t, key: i }));
      }
      function xi(e, t, i, n, r, o) {
        const a = di.get(e);
        if (!a) return;
        const s = new Set(),
          l = (e) => {
            e &&
              e.forEach((e) => {
                (e !== qt || e.allowRecurse) && s.add(e);
              });
          };
        if ("clear" === t) a.forEach(l);
        else if ("length" === i && Qt(e))
          a.forEach((e, t) => {
            ("length" === t || t >= n) && l(e);
          });
        else
          switch ((void 0 !== i && l(a.get(i)), t)) {
            case "add":
              Qt(e)
                ? oi(i) && l(a.get("length"))
                : (l(a.get(fi)), Xt(e) && l(a.get(hi)));
              break;
            case "delete":
              Qt(e) || (l(a.get(fi)), Xt(e) && l(a.get(hi)));
              break;
            case "set":
              Xt(e) && l(a.get(fi));
          }
        s.forEach((a) => {
          a.options.onTrigger &&
            a.options.onTrigger({
              effect: a,
              target: e,
              key: i,
              type: t,
              newValue: n,
              oldValue: r,
              oldTarget: o,
            }),
            a.options.scheduler ? a.options.scheduler(a) : a();
        });
      }
      var wi = Ut("__proto__,__v_isRef,__isVue"),
        $i = new Set(
          Object.getOwnPropertyNames(Symbol)
            .map((e) => Symbol[e])
            .filter(ei)
        ),
        Oi = ki(),
        Ai = ki(!0),
        Si = Ei();
      function Ei() {
        const e = {};
        return (
          ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...e) {
              const i = un(this);
              for (let e = 0, t = this.length; e < t; e++) yi(i, "get", e + "");
              const n = i[t].apply(i, e);
              return -1 === n || !1 === n ? i[t].apply(i, F(e.map(un))) : n;
            };
          }),
          ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...e) {
              bi.push(mi), (mi = !1);
              const i = un(this)[t].apply(this, e);
              return gi(), i;
            };
          }),
          e
        );
      }
      function ki(e = !1, t = !1) {
        return function (i, n, r) {
          if ("__v_isReactive" === n) return !e;
          if ("__v_isReadonly" === n) return e;
          if ("__v_raw" === n && r === (e ? (t ? on : rn) : t ? nn : tn).get(i))
            return i;
          const o = Qt(i);
          if (!e && o && Gt(Si, n)) return Reflect.get(Si, n, r);
          const a = Reflect.get(i, n, r);
          return (ei(n) ? $i.has(n) : wi(n))
            ? a
            : (e || yi(i, "get", n),
              t
                ? a
                : cn(a)
                ? o && oi(n)
                  ? a
                  : a.value
                : ti(a)
                ? e
                  ? sn(a)
                  : an(a)
                : a);
        };
      }
      function Mi(e = !1) {
        return function (t, i, n, r) {
          let o = t[i];
          if (!e && ((n = un(n)), (o = un(o)), !Qt(t) && cn(o) && !cn(n)))
            return (o.value = n), !0;
          const a = Qt(t) && oi(i) ? Number(i) < t.length : Gt(t, i),
            s = Reflect.set(t, i, n, r);
          return (
            t === un(r) &&
              (a ? ci(n, o) && xi(t, "set", i, n, o) : xi(t, "add", i, n)),
            s
          );
        };
      }
      var Di = {
          get: Oi,
          set: Mi(),
          deleteProperty: function (e, t) {
            const i = Gt(e, t),
              n = e[t],
              r = Reflect.deleteProperty(e, t);
            return r && i && xi(e, "delete", t, void 0, n), r;
          },
          has: function (e, t) {
            const i = Reflect.has(e, t);
            return (ei(t) && $i.has(t)) || yi(e, "has", t), i;
          },
          ownKeys: function (e) {
            return yi(e, "iterate", Qt(e) ? "length" : fi), Reflect.ownKeys(e);
          },
        },
        Ci = {
          get: Ai,
          set: (e, t) => (
            console.warn(
              `Set operation on key "${String(t)}" failed: target is readonly.`,
              e
            ),
            !0
          ),
          deleteProperty: (e, t) => (
            console.warn(
              `Delete operation on key "${String(
                t
              )}" failed: target is readonly.`,
              e
            ),
            !0
          ),
        },
        Ti = (e) => (ti(e) ? an(e) : e),
        Li = (e) => (ti(e) ? sn(e) : e),
        Ii = (e) => e,
        Ni = (e) => Reflect.getPrototypeOf(e);
      function Pi(e, t, i = !1, n = !1) {
        const r = un((e = e.__v_raw)),
          o = un(t);
        t !== o && !i && yi(r, "get", t), !i && yi(r, "get", o);
        const { has: a } = Ni(r),
          s = n ? Ii : i ? Li : Ti;
        return a.call(r, t)
          ? s(e.get(t))
          : a.call(r, o)
          ? s(e.get(o))
          : void (e !== r && e.get(t));
      }
      function ji(e, t = !1) {
        const i = this.__v_raw,
          n = un(i),
          r = un(e);
        return (
          e !== r && !t && yi(n, "has", e),
          !t && yi(n, "has", r),
          e === r ? i.has(e) : i.has(e) || i.has(r)
        );
      }
      function Yi(e, t = !1) {
        return (
          (e = e.__v_raw),
          !t && yi(un(e), "iterate", fi),
          Reflect.get(e, "size", e)
        );
      }
      function Ki(e) {
        e = un(e);
        const t = un(this);
        return Ni(t).has.call(t, e) || (t.add(e), xi(t, "add", e, e)), this;
      }
      function Fi(e, t) {
        t = un(t);
        const i = un(this),
          { has: n, get: r } = Ni(i);
        let o = n.call(i, e);
        o ? en(i, n, e) : ((e = un(e)), (o = n.call(i, e)));
        const a = r.call(i, e);
        return (
          i.set(e, t),
          o ? ci(t, a) && xi(i, "set", e, t, a) : xi(i, "add", e, t),
          this
        );
      }
      function Ri(e) {
        const t = un(this),
          { has: i, get: n } = Ni(t);
        let r = i.call(t, e);
        r ? en(t, i, e) : ((e = un(e)), (r = i.call(t, e)));
        const o = n ? n.call(t, e) : void 0,
          a = t.delete(e);
        return r && xi(t, "delete", e, void 0, o), a;
      }
      function Bi() {
        const e = un(this),
          t = 0 !== e.size,
          i = Xt(e) ? new Map(e) : new Set(e),
          n = e.clear();
        return t && xi(e, "clear", void 0, void 0, i), n;
      }
      function Hi(e, t) {
        return function (i, n) {
          const r = this,
            o = r.__v_raw,
            a = un(o),
            s = t ? Ii : e ? Li : Ti;
          return (
            !e && yi(a, "iterate", fi),
            o.forEach((e, t) => i.call(n, s(e), s(t), r))
          );
        };
      }
      function Vi(e, t, i) {
        return function (...n) {
          const r = this.__v_raw,
            o = un(r),
            a = Xt(o),
            s = "entries" === e || (e === Symbol.iterator && a),
            l = "keys" === e && a,
            u = r[e].apply(r, n),
            c = i ? Ii : t ? Li : Ti;
          return (
            !t && yi(o, "iterate", l ? hi : fi),
            {
              next() {
                const { value: e, done: t } = u.next();
                return t
                  ? { value: e, done: t }
                  : { value: s ? [c(e[0]), c(e[1])] : c(e), done: t };
              },
              [Symbol.iterator]() {
                return this;
              },
            }
          );
        };
      }
      function Wi(e) {
        return function (...t) {
          {
            const i = t[0] ? `on key "${t[0]}" ` : "";
            console.warn(
              `${ui(e)} operation ${i}failed: target is readonly.`,
              un(this)
            );
          }
          return "delete" !== e && this;
        };
      }
      function zi() {
        const e = {
            get(e) {
              return Pi(this, e);
            },
            get size() {
              return Yi(this);
            },
            has: ji,
            add: Ki,
            set: Fi,
            delete: Ri,
            clear: Bi,
            forEach: Hi(!1, !1),
          },
          t = {
            get(e) {
              return Pi(this, e, !1, !0);
            },
            get size() {
              return Yi(this);
            },
            has: ji,
            add: Ki,
            set: Fi,
            delete: Ri,
            clear: Bi,
            forEach: Hi(!1, !0),
          },
          i = {
            get(e) {
              return Pi(this, e, !0);
            },
            get size() {
              return Yi(this, !0);
            },
            has(e) {
              return ji.call(this, e, !0);
            },
            add: Wi("add"),
            set: Wi("set"),
            delete: Wi("delete"),
            clear: Wi("clear"),
            forEach: Hi(!0, !1),
          },
          n = {
            get(e) {
              return Pi(this, e, !0, !0);
            },
            get size() {
              return Yi(this, !0);
            },
            has(e) {
              return ji.call(this, e, !0);
            },
            add: Wi("add"),
            set: Wi("set"),
            delete: Wi("delete"),
            clear: Wi("clear"),
            forEach: Hi(!0, !0),
          };
        return (
          ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
            (e[r] = Vi(r, !1, !1)),
              (i[r] = Vi(r, !0, !1)),
              (t[r] = Vi(r, !1, !0)),
              (n[r] = Vi(r, !0, !0));
          }),
          [e, i, t, n]
        );
      }
      var [Ui, qi, Zi, Ji] = zi();
      function Gi(e, t) {
        const i = t ? (e ? Ji : Zi) : e ? qi : Ui;
        return (t, n, r) =>
          "__v_isReactive" === n
            ? !e
            : "__v_isReadonly" === n
            ? e
            : "__v_raw" === n
            ? t
            : Reflect.get(Gt(i, n) && n in t ? i : t, n, r);
      }
      var Qi = { get: Gi(!1, !1) },
        Xi = { get: Gi(!0, !1) };
      function en(e, t, i) {
        const n = un(i);
        if (n !== i && t.call(e, n)) {
          const t = ri(e);
          console.warn(
            `Reactive ${t} contains both the raw and reactive versions of the same object${
              "Map" === t ? " as keys" : ""
            }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
          );
        }
      }
      var tn = new WeakMap(),
        nn = new WeakMap(),
        rn = new WeakMap(),
        on = new WeakMap();
      function an(e) {
        return e && e.__v_isReadonly ? e : ln(e, !1, Di, Qi, tn);
      }
      function sn(e) {
        return ln(e, !0, Ci, Xi, rn);
      }
      function ln(e, t, i, n, r) {
        if (!ti(e))
          return console.warn(`value cannot be made reactive: ${String(e)}`), e;
        if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
        const o = r.get(e);
        if (o) return o;
        const a =
          (s = e).__v_skip || !Object.isExtensible(s)
            ? 0
            : (function (e) {
                switch (e) {
                  case "Object":
                  case "Array":
                    return 1;
                  case "Map":
                  case "Set":
                  case "WeakMap":
                  case "WeakSet":
                    return 2;
                  default:
                    return 0;
                }
              })(ri(s));
        var s;
        if (0 === a) return e;
        const l = new Proxy(e, 2 === a ? n : i);
        return r.set(e, l), l;
      }
      function un(e) {
        return (e && un(e.__v_raw)) || e;
      }
      function cn(e) {
        return Boolean(e && !0 === e.__v_isRef);
      }
      Fe("nextTick", () => gt),
        Fe("dispatch", (e) => ee.bind(ee, e)),
        Fe("watch", (e, { evaluateLater: t, effect: i }) => (n, r) => {
          let o,
            a = t(n),
            s = !0,
            l = i(() =>
              a((e) => {
                JSON.stringify(e),
                  s
                    ? (o = e)
                    : queueMicrotask(() => {
                        r(e, o), (o = e);
                      }),
                  (s = !1);
              })
            );
          e._x_effects.delete(l);
        }),
        Fe("store", function () {
          return Rt;
        }),
        Fe("data", (e) => Te(e)),
        Fe("root", (e) => ce(e)),
        Fe(
          "refs",
          (e) => (
            e._x_refs_proxy ||
              (e._x_refs_proxy = Ne(
                (function (e) {
                  let t = [],
                    i = e;
                  for (; i; )
                    i._x_refs && t.push(i._x_refs), (i = i.parentNode);
                  return t;
                })(e)
              )),
            e._x_refs_proxy
          )
        );
      var dn = {};
      function pn(e) {
        return dn[e] || (dn[e] = 0), ++dn[e];
      }
      function fn(e, t, i) {
        Fe(t, (t) =>
          ie(
            `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${i}`,
            t
          )
        );
      }
      Fe("id", (e) => (t, i = null) => {
        let n = (function (e, t) {
            return de(e, (e) => {
              if (e._x_ids && e._x_ids[t]) return !0;
            });
          })(e, t),
          r = n ? n._x_ids[t] : pn(t);
        return i ? `${t}-${r}-${i}` : `${t}-${r}`;
      }),
        Fe("el", (e) => e),
        fn("Focus", "focus", "focus"),
        fn("Persist", "persist", "persist"),
        tt(
          "modelable",
          (
            e,
            { expression: t },
            { effect: i, evaluateLater: n, cleanup: r }
          ) => {
            let o = n(t),
              a = () => {
                let e;
                return o((t) => (e = t)), e;
              },
              s = n(`${t} = __placeholder`),
              l = (e) => s(() => {}, { scope: { __placeholder: e } }),
              u = a();
            l(u),
              queueMicrotask(() => {
                if (!e._x_model) return;
                e._x_removeModelListeners.default();
                let t = e._x_model.get,
                  i = e._x_model.set,
                  n = Ft(
                    {
                      get: () => t(),
                      set(e) {
                        i(e);
                      },
                    },
                    {
                      get: () => a(),
                      set(e) {
                        l(e);
                      },
                    }
                  );
                r(n);
              });
          }
        );
      var hn = document.createElement("div");
      tt("teleport", (e, { modifiers: t, expression: i }, { cleanup: n }) => {
        "template" !== e.tagName.toLowerCase() &&
          ie("x-teleport can only be used on a <template> tag", e);
        let r = Dt(
          () => document.querySelector(i),
          () => hn
        )();
        r || ie(`Cannot find x-teleport element for selector: "${i}"`);
        let o = e.content.cloneNode(!0).firstElementChild;
        (e._x_teleport = o),
          (o._x_teleportBack = e),
          e._x_forwardEvents &&
            e._x_forwardEvents.forEach((t) => {
              o.addEventListener(t, (t) => {
                t.stopPropagation(),
                  e.dispatchEvent(new t.constructor(t.type, t));
              });
            }),
          Le(o, {}, e),
          ke(() => {
            t.includes("prepend")
              ? r.parentNode.insertBefore(o, r)
              : t.includes("append")
              ? r.parentNode.insertBefore(o, r.nextSibling)
              : r.appendChild(o),
              fe(o),
              (o._x_ignore = !0);
          }),
          n(() => o.remove());
      });
      var _n = () => {};
      function vn(e, t, i, n) {
        let r = e,
          o = (e) => n(e),
          a = {},
          s = (e, t) => (i) => t(e, i);
        if (
          (i.includes("dot") && (t = t.replace(/-/g, ".")),
          i.includes("camel") &&
            (t = t.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase())),
          i.includes("passive") && (a.passive = !0),
          i.includes("capture") && (a.capture = !0),
          i.includes("window") && (r = window),
          i.includes("document") && (r = document),
          i.includes("debounce"))
        ) {
          let e = i[i.indexOf("debounce") + 1] || "invalid-wait",
            t = mn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
          o = Yt(o, t);
        }
        if (i.includes("throttle")) {
          let e = i[i.indexOf("throttle") + 1] || "invalid-wait",
            t = mn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
          o = Kt(o, t);
        }
        return (
          i.includes("prevent") &&
            (o = s(o, (e, t) => {
              t.preventDefault(), e(t);
            })),
          i.includes("stop") &&
            (o = s(o, (e, t) => {
              t.stopPropagation(), e(t);
            })),
          i.includes("self") &&
            (o = s(o, (t, i) => {
              i.target === e && t(i);
            })),
          (i.includes("away") || i.includes("outside")) &&
            ((r = document),
            (o = s(o, (t, i) => {
              e.contains(i.target) ||
                (!1 !== i.target.isConnected &&
                  ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
                    (!1 !== e._x_isShown && t(i))));
            }))),
          i.includes("once") &&
            (o = s(o, (e, i) => {
              e(i), r.removeEventListener(t, o, a);
            })),
          (o = s(o, (e, n) => {
            ((function (e) {
              return ["keydown", "keyup"].includes(e);
            })(t) &&
              (function (e, t) {
                let i = t.filter(
                  (e) =>
                    ![
                      "window",
                      "document",
                      "prevent",
                      "stop",
                      "once",
                      "capture",
                    ].includes(e)
                );
                if (i.includes("debounce")) {
                  let e = i.indexOf("debounce");
                  i.splice(
                    e,
                    mn((i[e + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1
                  );
                }
                if (i.includes("throttle")) {
                  let e = i.indexOf("throttle");
                  i.splice(
                    e,
                    mn((i[e + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1
                  );
                }
                if (0 === i.length) return !1;
                if (1 === i.length && bn(e.key).includes(i[0])) return !1;
                const n = [
                  "ctrl",
                  "shift",
                  "alt",
                  "meta",
                  "cmd",
                  "super",
                ].filter((e) => i.includes(e));
                return (
                  (i = i.filter((e) => !n.includes(e))),
                  !(
                    n.length > 0 &&
                    n.filter(
                      (t) => (
                        ("cmd" !== t && "super" !== t) || (t = "meta"),
                        e[`${t}Key`]
                      )
                    ).length === n.length &&
                    bn(e.key).includes(i[0])
                  )
                );
              })(n, i)) ||
              e(n);
          })),
          r.addEventListener(t, o, a),
          () => {
            r.removeEventListener(t, o, a);
          }
        );
      }
      function mn(e) {
        return !Array.isArray(e) && !isNaN(e);
      }
      function bn(e) {
        if (!e) return [];
        var t;
        e = [" ", "_"].includes((t = e))
          ? t
          : t
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/[_\s]/, "-")
              .toLowerCase();
        let i = {
          ctrl: "control",
          slash: "/",
          space: " ",
          spacebar: " ",
          cmd: "meta",
          esc: "escape",
          up: "arrow-up",
          down: "arrow-down",
          left: "arrow-left",
          right: "arrow-right",
          period: ".",
          equal: "=",
          minus: "-",
          underscore: "_",
        };
        return (
          (i[e] = e),
          Object.keys(i)
            .map((t) => {
              if (i[t] === e) return t;
            })
            .filter((e) => e)
        );
      }
      function gn(e) {
        let t = e ? parseFloat(e) : null;
        return (i = t), Array.isArray(i) || isNaN(i) ? e : t;
        var i;
      }
      function yn(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "function" == typeof e.get &&
          "function" == typeof e.set
        );
      }
      (_n.inline = (e, { modifiers: t }, { cleanup: i }) => {
        t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
          i(() => {
            t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
          });
      }),
        tt("ignore", _n),
        tt("effect", (e, { expression: t }, { effect: i }) => i(Ue(e, t))),
        tt(
          "model",
          (e, { modifiers: t, expression: i }, { effect: n, cleanup: r }) => {
            let o = e;
            t.includes("parent") && (o = e.parentNode);
            let a,
              s = Ue(o, i);
            a =
              "string" == typeof i
                ? Ue(o, `${i} = __placeholder`)
                : "function" == typeof i && "string" == typeof i()
                ? Ue(o, `${i()} = __placeholder`)
                : () => {};
            let l = () => {
                let e;
                return s((t) => (e = t)), yn(e) ? e.get() : e;
              },
              u = (e) => {
                let t;
                s((e) => (t = e)),
                  yn(t)
                    ? t.set(e)
                    : a(() => {}, { scope: { __placeholder: e } });
              };
            "string" == typeof i &&
              "radio" === e.type &&
              ke(() => {
                e.hasAttribute("name") || e.setAttribute("name", i);
              });
            var c =
              "select" === e.tagName.toLowerCase() ||
              ["checkbox", "radio"].includes(e.type) ||
              t.includes("lazy")
                ? "change"
                : "input";
            let d = Mt
              ? () => {}
              : vn(e, c, t, (i) => {
                  u(
                    (function (e, t, i, n) {
                      return ke(() => {
                        if (i instanceof CustomEvent && void 0 !== i.detail)
                          return i.detail ?? i.target.value;
                        if ("checkbox" === e.type) {
                          if (Array.isArray(n)) {
                            let e = t.includes("number")
                              ? gn(i.target.value)
                              : i.target.value;
                            return i.target.checked
                              ? n.concat([e])
                              : n.filter((t) => !(t == e));
                          }
                          return i.target.checked;
                        }
                        if ("select" === e.tagName.toLowerCase() && e.multiple)
                          return t.includes("number")
                            ? Array.from(i.target.selectedOptions).map((e) =>
                                gn(e.value || e.text)
                              )
                            : Array.from(i.target.selectedOptions).map(
                                (e) => e.value || e.text
                              );
                        {
                          let e = i.target.value;
                          return t.includes("number")
                            ? gn(e)
                            : t.includes("trim")
                            ? e.trim()
                            : e;
                        }
                      });
                    })(e, t, i, l())
                  );
                });
            if (
              (t.includes("fill") &&
                ([null, ""].includes(l()) ||
                  ("checkbox" === e.type && Array.isArray(l()))) &&
                e.dispatchEvent(new Event(c, {})),
              e._x_removeModelListeners || (e._x_removeModelListeners = {}),
              (e._x_removeModelListeners.default = d),
              r(() => e._x_removeModelListeners.default()),
              e.form)
            ) {
              let t = vn(e.form, "reset", [], (t) => {
                gt(() => e._x_model && e._x_model.set(e.value));
              });
              r(() => t());
            }
            (e._x_model = {
              get: () => l(),
              set(e) {
                u(e);
              },
            }),
              (e._x_forceModelUpdate = (t) => {
                void 0 === t &&
                  "string" == typeof i &&
                  i.match(/\./) &&
                  (t = ""),
                  (window.fromModel = !0),
                  ke(() => Lt(e, "value", t)),
                  delete window.fromModel;
              }),
              n(() => {
                let i = l();
                (t.includes("unintrusive") &&
                  document.activeElement.isSameNode(e)) ||
                  e._x_forceModelUpdate(i);
              });
          }
        ),
        tt("cloak", (e) =>
          queueMicrotask(() => ke(() => e.removeAttribute(Xe("cloak"))))
        ),
        ue(() => `[${Xe("init")}]`),
        tt(
          "init",
          Dt((e, { expression: t }, { evaluate: i }) =>
            "string" == typeof t ? !!t.trim() && i(t, {}, !1) : i(t, {}, !1)
          )
        ),
        tt("text", (e, { expression: t }, { effect: i, evaluateLater: n }) => {
          let r = n(t);
          i(() => {
            r((t) => {
              ke(() => {
                e.textContent = t;
              });
            });
          });
        }),
        tt("html", (e, { expression: t }, { effect: i, evaluateLater: n }) => {
          let r = n(t);
          i(() => {
            r((t) => {
              ke(() => {
                (e.innerHTML = t),
                  (e._x_ignoreSelf = !0),
                  fe(e),
                  delete e._x_ignoreSelf;
              });
            });
          });
        }),
        dt(lt(":", Xe("bind:")));
      var xn = (
        e,
        { value: t, modifiers: i, expression: n, original: r },
        { effect: o }
      ) => {
        if (!t) {
          let t = {};
          return (
            (a = t),
            Object.entries(Ht).forEach(([e, t]) => {
              Object.defineProperty(a, e, {
                get:
                  () =>
                  (...e) =>
                    t.apply(void 0, e),
              });
            }),
            void Ue(e, n)(
              (t) => {
                Vt(e, t, r);
              },
              { scope: t }
            )
          );
        }
        var a;
        if ("key" === t)
          return (function (e, t) {
            e._x_keyExpression = t;
          })(e, n);
        if (
          e._x_inlineBindings &&
          e._x_inlineBindings[t] &&
          e._x_inlineBindings[t].extract
        )
          return;
        let s = Ue(e, n);
        o(() =>
          s((r) => {
            void 0 === r && "string" == typeof n && n.match(/\./) && (r = ""),
              ke(() => Lt(e, t, r, i));
          })
        );
      };
      function wn(e, t, i, n) {
        let r = {};
        return (
          /^\[.*\]$/.test(e.item) && Array.isArray(t)
            ? e.item
                .replace("[", "")
                .replace("]", "")
                .split(",")
                .map((e) => e.trim())
                .forEach((e, i) => {
                  r[e] = t[i];
                })
            : /^\{.*\}$/.test(e.item) &&
              !Array.isArray(t) &&
              "object" == typeof t
            ? e.item
                .replace("{", "")
                .replace("}", "")
                .split(",")
                .map((e) => e.trim())
                .forEach((e) => {
                  r[e] = t[e];
                })
            : (r[e.item] = t),
          e.index && (r[e.index] = i),
          e.collection && (r[e.collection] = n),
          r
        );
      }
      function $n() {}
      function On(e, t, i) {
        tt(t, (n) =>
          ie(
            `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${i}`,
            n
          )
        );
      }
      (xn.inline = (e, { value: t, modifiers: i, expression: n }) => {
        t &&
          (e._x_inlineBindings || (e._x_inlineBindings = {}),
          (e._x_inlineBindings[t] = { expression: n, extract: !1 }));
      }),
        tt("bind", xn),
        le(() => `[${Xe("data")}]`),
        tt("data", (e, { expression: t }, { cleanup: i }) => {
          if (
            (function (e) {
              return !!Mt && (!!Ct || e.hasAttribute("data-has-alpine-state"));
            })(e)
          )
            return;
          t = "" === t ? "{}" : t;
          let n = {};
          Re(n, e);
          let r = {};
          var o, a;
          (o = r),
            (a = n),
            Object.entries(Wt).forEach(([e, t]) => {
              Object.defineProperty(o, e, {
                get:
                  () =>
                  (...e) =>
                    t.bind(a).apply(void 0, e),
                enumerable: !1,
              });
            });
          let s = ze(e, t, { scope: r });
          (void 0 !== s && !0 !== s) || (s = {}), Re(s, e);
          let l = B(s);
          Pe(l);
          let u = Le(e, l);
          l.init && ze(e, l.init),
            i(() => {
              l.destroy && ze(e, l.destroy), u();
            });
        }),
        tt("show", (e, { modifiers: t, expression: i }, { effect: n }) => {
          let r = Ue(e, i);
          e._x_doHide ||
            (e._x_doHide = () => {
              ke(() => {
                e.style.setProperty(
                  "display",
                  "none",
                  t.includes("important") ? "important" : void 0
                );
              });
            }),
            e._x_doShow ||
              (e._x_doShow = () => {
                ke(() => {
                  1 === e.style.length && "none" === e.style.display
                    ? e.removeAttribute("style")
                    : e.style.removeProperty("display");
                });
              });
          let o,
            a = () => {
              e._x_doHide(), (e._x_isShown = !1);
            },
            s = () => {
              e._x_doShow(), (e._x_isShown = !0);
            },
            l = () => setTimeout(s),
            u = Ot(
              (e) => (e ? s() : a()),
              (t) => {
                "function" == typeof e._x_toggleAndCascadeWithTransitions
                  ? e._x_toggleAndCascadeWithTransitions(e, t, s, a)
                  : t
                  ? l()
                  : a();
              }
            ),
            c = !0;
          n(() =>
            r((e) => {
              (c || e !== o) &&
                (t.includes("immediate") && (e ? l() : a()),
                u(e),
                (o = e),
                (c = !1));
            })
          );
        }),
        tt("for", (e, { expression: t }, { effect: i, cleanup: n }) => {
          let r = (function (e) {
              let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
                i = e.match(/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/);
              if (!i) return;
              let n = {};
              n.items = i[2].trim();
              let r = i[1].replace(/^\s*\(|\)\s*$/g, "").trim(),
                o = r.match(t);
              return (
                o
                  ? ((n.item = r.replace(t, "").trim()),
                    (n.index = o[1].trim()),
                    o[2] && (n.collection = o[2].trim()))
                  : (n.item = r),
                n
              );
            })(t),
            o = Ue(e, r.items),
            a = Ue(e, e._x_keyExpression || "index");
          (e._x_prevKeys = []),
            (e._x_lookup = {}),
            i(() =>
              (function (e, t, i, n) {
                let r = e;
                i((i) => {
                  var o;
                  (o = i),
                    !Array.isArray(o) &&
                      !isNaN(o) &&
                      i >= 0 &&
                      (i = Array.from(Array(i).keys(), (e) => e + 1)),
                    void 0 === i && (i = []);
                  let a = e._x_lookup,
                    s = e._x_prevKeys,
                    l = [],
                    u = [];
                  if ("object" != typeof (c = i) || Array.isArray(c))
                    for (let e = 0; e < i.length; e++) {
                      let r = wn(t, i[e], e, i);
                      n((e) => u.push(e), { scope: { index: e, ...r } }),
                        l.push(r);
                    }
                  else
                    i = Object.entries(i).map(([e, r]) => {
                      let o = wn(t, r, e, i);
                      n((e) => u.push(e), { scope: { index: e, ...o } }),
                        l.push(o);
                    });
                  var c;
                  let d = [],
                    p = [],
                    f = [],
                    h = [];
                  for (let e = 0; e < s.length; e++) {
                    let t = s[e];
                    -1 === u.indexOf(t) && f.push(t);
                  }
                  s = s.filter((e) => !f.includes(e));
                  let _ = "template";
                  for (let e = 0; e < u.length; e++) {
                    let t = u[e],
                      i = s.indexOf(t);
                    if (-1 === i) s.splice(e, 0, t), d.push([_, e]);
                    else if (i !== e) {
                      let t = s.splice(e, 1)[0],
                        n = s.splice(i - 1, 1)[0];
                      s.splice(e, 0, n), s.splice(i, 0, t), p.push([t, n]);
                    } else h.push(t);
                    _ = t;
                  }
                  for (let e = 0; e < f.length; e++) {
                    let t = f[e];
                    a[t]._x_effects && a[t]._x_effects.forEach(J),
                      a[t].remove(),
                      (a[t] = null),
                      delete a[t];
                  }
                  for (let e = 0; e < p.length; e++) {
                    let [t, i] = p[e],
                      n = a[t],
                      o = a[i],
                      s = document.createElement("div");
                    ke(() => {
                      o || ie('x-for ":key" is undefined or invalid', r),
                        o.after(s),
                        n.after(o),
                        o._x_currentIfEl && o.after(o._x_currentIfEl),
                        s.before(n),
                        n._x_currentIfEl && n.after(n._x_currentIfEl),
                        s.remove();
                    }),
                      o._x_refreshXForScope(l[u.indexOf(i)]);
                  }
                  for (let e = 0; e < d.length; e++) {
                    let [t, i] = d[e],
                      n = "template" === t ? r : a[t];
                    n._x_currentIfEl && (n = n._x_currentIfEl);
                    let o = l[i],
                      s = u[i],
                      c = document.importNode(r.content, !0).firstElementChild,
                      p = B(o);
                    Le(c, p, r),
                      (c._x_refreshXForScope = (e) => {
                        Object.entries(e).forEach(([e, t]) => {
                          p[e] = t;
                        });
                      }),
                      ke(() => {
                        n.after(c), fe(c);
                      }),
                      "object" == typeof s &&
                        ie(
                          "x-for key cannot be an object, it must be a string or an integer",
                          r
                        ),
                      (a[s] = c);
                  }
                  for (let e = 0; e < h.length; e++)
                    a[h[e]]._x_refreshXForScope(l[u.indexOf(h[e])]);
                  r._x_prevKeys = u;
                });
              })(e, r, o, a)
            ),
            n(() => {
              Object.values(e._x_lookup).forEach((e) => e.remove()),
                delete e._x_prevKeys,
                delete e._x_lookup;
            });
        }),
        ($n.inline = (e, { expression: t }, { cleanup: i }) => {
          let n = ce(e);
          n._x_refs || (n._x_refs = {}),
            (n._x_refs[t] = e),
            i(() => delete n._x_refs[t]);
        }),
        tt("ref", $n),
        tt("if", (e, { expression: t }, { effect: i, cleanup: n }) => {
          let r = Ue(e, t);
          i(() =>
            r((t) => {
              t
                ? (() => {
                    if (e._x_currentIfEl) return e._x_currentIfEl;
                    let t = e.content.cloneNode(!0).firstElementChild;
                    Le(t, {}, e),
                      ke(() => {
                        e.after(t), fe(t);
                      }),
                      (e._x_currentIfEl = t),
                      (e._x_undoIf = () => {
                        te(t, (e) => {
                          e._x_effects && e._x_effects.forEach(J);
                        }),
                          t.remove(),
                          delete e._x_currentIfEl;
                      });
                  })()
                : e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
            })
          ),
            n(() => e._x_undoIf && e._x_undoIf());
        }),
        tt("id", (e, { expression: t }, { evaluate: i }) => {
          i(t).forEach((t) =>
            (function (e, t) {
              e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = pn(t));
            })(e, t)
          );
        }),
        dt(lt("@", Xe("on:"))),
        tt(
          "on",
          Dt((e, { value: t, modifiers: i, expression: n }, { cleanup: r }) => {
            let o = n ? Ue(e, n) : () => {};
            "template" === e.tagName.toLowerCase() &&
              (e._x_forwardEvents || (e._x_forwardEvents = []),
              e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
            let a = vn(e, t, i, (e) => {
              o(() => {}, { scope: { $event: e }, params: [e] });
            });
            r(() => a());
          })
        ),
        On("Collapse", "collapse", "collapse"),
        On("Intersect", "intersect", "intersect"),
        On("Focus", "trap", "focus"),
        On("Mask", "mask", "mask"),
        zt.setEvaluator(Ze),
        zt.setReactivityEngine({
          reactive: an,
          effect: function (e, t = Zt) {
            (function (e) {
              return e && !0 === e._isEffect;
            })(e) && (e = e.raw);
            const i = (function (e, t) {
              const i = function () {
                if (!i.active) return e();
                if (!pi.includes(i)) {
                  vi(i);
                  try {
                    return bi.push(mi), (mi = !0), pi.push(i), (qt = i), e();
                  } finally {
                    pi.pop(), gi(), (qt = pi[pi.length - 1]);
                  }
                }
              };
              return (
                (i.id = _i++),
                (i.allowRecurse = !!t.allowRecurse),
                (i._isEffect = !0),
                (i.active = !0),
                (i.raw = e),
                (i.deps = []),
                (i.options = t),
                i
              );
            })(e, t);
            return t.lazy || i(), i;
          },
          release: function (e) {
            e.active &&
              (vi(e), e.options.onStop && e.options.onStop(), (e.active = !1));
          },
          raw: un,
        });
      var An = zt;
      let Sn = () => {};
      const En = (e) => (
        "function" == typeof e && (e = e()),
        "object" == typeof e && (e = JSON.stringify(e)),
        window.navigator.clipboard.writeText(e).then(Sn)
      );
      function kn(e) {
        e.magic("clipboard", () => En),
          e.directive(
            "clipboard",
            (
              e,
              { modifiers: t, expression: i },
              { evaluateLater: n, cleanup: r }
            ) => {
              const o = t.includes("raw") ? (e) => e(i) : n(i),
                a = () => o(En);
              e.addEventListener("click", a),
                r(() => {
                  e.removeEventListener("click", a);
                });
            }
          );
      }
      kn.configure = (e) => (
        e.hasOwnProperty("onCopy") &&
          "function" == typeof e.onCopy &&
          (Sn = e.onCopy),
        kn
      );
      const Mn = kn;
      function Dn(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
          var t = e.ownerDocument;
          return (t && t.defaultView) || window;
        }
        return e;
      }
      function Cn(e) {
        return e instanceof Dn(e).Element || e instanceof Element;
      }
      function Tn(e) {
        return e instanceof Dn(e).HTMLElement || e instanceof HTMLElement;
      }
      function Ln(e) {
        return (
          "undefined" != typeof ShadowRoot &&
          (e instanceof Dn(e).ShadowRoot || e instanceof ShadowRoot)
        );
      }
      var In = Math.max,
        Nn = Math.min,
        Pn = Math.round;
      function jn() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands)
          ? e.brands
              .map(function (e) {
                return e.brand + "/" + e.version;
              })
              .join(" ")
          : navigator.userAgent;
      }
      function Yn() {
        return !/^((?!chrome|android).)*safari/i.test(jn());
      }
      function Kn(e, t, i) {
        void 0 === t && (t = !1), void 0 === i && (i = !1);
        var n = e.getBoundingClientRect(),
          r = 1,
          o = 1;
        t &&
          Tn(e) &&
          ((r = (e.offsetWidth > 0 && Pn(n.width) / e.offsetWidth) || 1),
          (o = (e.offsetHeight > 0 && Pn(n.height) / e.offsetHeight) || 1));
        var a = (Cn(e) ? Dn(e) : window).visualViewport,
          s = !Yn() && i,
          l = (n.left + (s && a ? a.offsetLeft : 0)) / r,
          u = (n.top + (s && a ? a.offsetTop : 0)) / o,
          c = n.width / r,
          d = n.height / o;
        return {
          width: c,
          height: d,
          top: u,
          right: l + c,
          bottom: u + d,
          left: l,
          x: l,
          y: u,
        };
      }
      function Fn(e) {
        var t = Dn(e);
        return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
      }
      function Rn(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
      }
      function Bn(e) {
        return ((Cn(e) ? e.ownerDocument : e.document) || window.document)
          .documentElement;
      }
      function Hn(e) {
        return Kn(Bn(e)).left + Fn(e).scrollLeft;
      }
      function Vn(e) {
        return Dn(e).getComputedStyle(e);
      }
      function Wn(e) {
        var t = Vn(e),
          i = t.overflow,
          n = t.overflowX,
          r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + r + n);
      }
      function zn(e, t, i) {
        void 0 === i && (i = !1);
        var n,
          r,
          o = Tn(t),
          a =
            Tn(t) &&
            (function (e) {
              var t = e.getBoundingClientRect(),
                i = Pn(t.width) / e.offsetWidth || 1,
                n = Pn(t.height) / e.offsetHeight || 1;
              return 1 !== i || 1 !== n;
            })(t),
          s = Bn(t),
          l = Kn(e, a, i),
          u = { scrollLeft: 0, scrollTop: 0 },
          c = { x: 0, y: 0 };
        return (
          (o || (!o && !i)) &&
            (("body" !== Rn(t) || Wn(s)) &&
              (u =
                (n = t) !== Dn(n) && Tn(n)
                  ? { scrollLeft: (r = n).scrollLeft, scrollTop: r.scrollTop }
                  : Fn(n)),
            Tn(t)
              ? (((c = Kn(t, !0)).x += t.clientLeft), (c.y += t.clientTop))
              : s && (c.x = Hn(s))),
          {
            x: l.left + u.scrollLeft - c.x,
            y: l.top + u.scrollTop - c.y,
            width: l.width,
            height: l.height,
          }
        );
      }
      function Un(e) {
        var t = Kn(e),
          i = e.offsetWidth,
          n = e.offsetHeight;
        return (
          Math.abs(t.width - i) <= 1 && (i = t.width),
          Math.abs(t.height - n) <= 1 && (n = t.height),
          { x: e.offsetLeft, y: e.offsetTop, width: i, height: n }
        );
      }
      function qn(e) {
        return "html" === Rn(e)
          ? e
          : e.assignedSlot || e.parentNode || (Ln(e) ? e.host : null) || Bn(e);
      }
      function Zn(e) {
        return ["html", "body", "#document"].indexOf(Rn(e)) >= 0
          ? e.ownerDocument.body
          : Tn(e) && Wn(e)
          ? e
          : Zn(qn(e));
      }
      function Jn(e, t) {
        var i;
        void 0 === t && (t = []);
        var n = Zn(e),
          r = n === (null == (i = e.ownerDocument) ? void 0 : i.body),
          o = Dn(n),
          a = r ? [o].concat(o.visualViewport || [], Wn(n) ? n : []) : n,
          s = t.concat(a);
        return r ? s : s.concat(Jn(qn(a)));
      }
      function Gn(e) {
        return ["table", "td", "th"].indexOf(Rn(e)) >= 0;
      }
      function Qn(e) {
        return Tn(e) && "fixed" !== Vn(e).position ? e.offsetParent : null;
      }
      function Xn(e) {
        for (
          var t = Dn(e), i = Qn(e);
          i && Gn(i) && "static" === Vn(i).position;

        )
          i = Qn(i);
        return i &&
          ("html" === Rn(i) ||
            ("body" === Rn(i) && "static" === Vn(i).position))
          ? t
          : i ||
              (function (e) {
                var t = /firefox/i.test(jn());
                if (
                  /Trident/i.test(jn()) &&
                  Tn(e) &&
                  "fixed" === Vn(e).position
                )
                  return null;
                var i = qn(e);
                for (
                  Ln(i) && (i = i.host);
                  Tn(i) && ["html", "body"].indexOf(Rn(i)) < 0;

                ) {
                  var n = Vn(i);
                  if (
                    "none" !== n.transform ||
                    "none" !== n.perspective ||
                    "paint" === n.contain ||
                    -1 !== ["transform", "perspective"].indexOf(n.willChange) ||
                    (t && "filter" === n.willChange) ||
                    (t && n.filter && "none" !== n.filter)
                  )
                    return i;
                  i = i.parentNode;
                }
                return null;
              })(e) ||
              t;
      }
      var er = "top",
        tr = "bottom",
        ir = "right",
        nr = "left",
        rr = "auto",
        or = [er, tr, ir, nr],
        ar = "start",
        sr = "end",
        lr = "viewport",
        ur = "popper",
        cr = or.reduce(function (e, t) {
          return e.concat([t + "-" + ar, t + "-" + sr]);
        }, []),
        dr = [].concat(or, [rr]).reduce(function (e, t) {
          return e.concat([t, t + "-" + ar, t + "-" + sr]);
        }, []),
        pr = [
          "beforeRead",
          "read",
          "afterRead",
          "beforeMain",
          "main",
          "afterMain",
          "beforeWrite",
          "write",
          "afterWrite",
        ];
      function fr(e) {
        var t = new Map(),
          i = new Set(),
          n = [];
        function r(e) {
          i.add(e.name),
            []
              .concat(e.requires || [], e.requiresIfExists || [])
              .forEach(function (e) {
                if (!i.has(e)) {
                  var n = t.get(e);
                  n && r(n);
                }
              }),
            n.push(e);
        }
        return (
          e.forEach(function (e) {
            t.set(e.name, e);
          }),
          e.forEach(function (e) {
            i.has(e.name) || r(e);
          }),
          n
        );
      }
      var hr = { placement: "bottom", modifiers: [], strategy: "absolute" };
      function _r() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
          t[i] = arguments[i];
        return !t.some(function (e) {
          return !(e && "function" == typeof e.getBoundingClientRect);
        });
      }
      function vr(e) {
        void 0 === e && (e = {});
        var t = e,
          i = t.defaultModifiers,
          n = void 0 === i ? [] : i,
          r = t.defaultOptions,
          o = void 0 === r ? hr : r;
        return function (e, t, i) {
          void 0 === i && (i = o);
          var r,
            a,
            s = {
              placement: "bottom",
              orderedModifiers: [],
              options: Object.assign({}, hr, o),
              modifiersData: {},
              elements: { reference: e, popper: t },
              attributes: {},
              styles: {},
            },
            l = [],
            u = !1,
            c = {
              state: s,
              setOptions: function (i) {
                var r = "function" == typeof i ? i(s.options) : i;
                d(),
                  (s.options = Object.assign({}, o, s.options, r)),
                  (s.scrollParents = {
                    reference: Cn(e)
                      ? Jn(e)
                      : e.contextElement
                      ? Jn(e.contextElement)
                      : [],
                    popper: Jn(t),
                  });
                var a,
                  u,
                  p = (function (e) {
                    var t = fr(e);
                    return pr.reduce(function (e, i) {
                      return e.concat(
                        t.filter(function (e) {
                          return e.phase === i;
                        })
                      );
                    }, []);
                  })(
                    ((a = [].concat(n, s.options.modifiers)),
                    (u = a.reduce(function (e, t) {
                      var i = e[t.name];
                      return (
                        (e[t.name] = i
                          ? Object.assign({}, i, t, {
                              options: Object.assign({}, i.options, t.options),
                              data: Object.assign({}, i.data, t.data),
                            })
                          : t),
                        e
                      );
                    }, {})),
                    Object.keys(u).map(function (e) {
                      return u[e];
                    }))
                  );
                return (
                  (s.orderedModifiers = p.filter(function (e) {
                    return e.enabled;
                  })),
                  s.orderedModifiers.forEach(function (e) {
                    var t = e.name,
                      i = e.options,
                      n = void 0 === i ? {} : i,
                      r = e.effect;
                    if ("function" == typeof r) {
                      var o = r({ state: s, name: t, instance: c, options: n });
                      l.push(o || function () {});
                    }
                  }),
                  c.update()
                );
              },
              forceUpdate: function () {
                if (!u) {
                  var e = s.elements,
                    t = e.reference,
                    i = e.popper;
                  if (_r(t, i)) {
                    (s.rects = {
                      reference: zn(t, Xn(i), "fixed" === s.options.strategy),
                      popper: Un(i),
                    }),
                      (s.reset = !1),
                      (s.placement = s.options.placement),
                      s.orderedModifiers.forEach(function (e) {
                        return (s.modifiersData[e.name] = Object.assign(
                          {},
                          e.data
                        ));
                      });
                    for (var n = 0; n < s.orderedModifiers.length; n++)
                      if (!0 !== s.reset) {
                        var r = s.orderedModifiers[n],
                          o = r.fn,
                          a = r.options,
                          l = void 0 === a ? {} : a,
                          d = r.name;
                        "function" == typeof o &&
                          (s =
                            o({ state: s, options: l, name: d, instance: c }) ||
                            s);
                      } else (s.reset = !1), (n = -1);
                  }
                }
              },
              update:
                ((r = function () {
                  return new Promise(function (e) {
                    c.forceUpdate(), e(s);
                  });
                }),
                function () {
                  return (
                    a ||
                      (a = new Promise(function (e) {
                        Promise.resolve().then(function () {
                          (a = void 0), e(r());
                        });
                      })),
                    a
                  );
                }),
              destroy: function () {
                d(), (u = !0);
              },
            };
          if (!_r(e, t)) return c;
          function d() {
            l.forEach(function (e) {
              return e();
            }),
              (l = []);
          }
          return (
            c.setOptions(i).then(function (e) {
              !u && i.onFirstUpdate && i.onFirstUpdate(e);
            }),
            c
          );
        };
      }
      var mr = { passive: !0 };
      function br(e) {
        return e.split("-")[0];
      }
      function gr(e) {
        return e.split("-")[1];
      }
      function yr(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
      }
      function xr(e) {
        var t,
          i = e.reference,
          n = e.element,
          r = e.placement,
          o = r ? br(r) : null,
          a = r ? gr(r) : null,
          s = i.x + i.width / 2 - n.width / 2,
          l = i.y + i.height / 2 - n.height / 2;
        switch (o) {
          case er:
            t = { x: s, y: i.y - n.height };
            break;
          case tr:
            t = { x: s, y: i.y + i.height };
            break;
          case ir:
            t = { x: i.x + i.width, y: l };
            break;
          case nr:
            t = { x: i.x - n.width, y: l };
            break;
          default:
            t = { x: i.x, y: i.y };
        }
        var u = o ? yr(o) : null;
        if (null != u) {
          var c = "y" === u ? "height" : "width";
          switch (a) {
            case ar:
              t[u] = t[u] - (i[c] / 2 - n[c] / 2);
              break;
            case sr:
              t[u] = t[u] + (i[c] / 2 - n[c] / 2);
          }
        }
        return t;
      }
      var wr = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
      function $r(e) {
        var t,
          i = e.popper,
          n = e.popperRect,
          r = e.placement,
          o = e.variation,
          a = e.offsets,
          s = e.position,
          l = e.gpuAcceleration,
          u = e.adaptive,
          c = e.roundOffsets,
          d = e.isFixed,
          p = a.x,
          f = void 0 === p ? 0 : p,
          h = a.y,
          _ = void 0 === h ? 0 : h,
          v = "function" == typeof c ? c({ x: f, y: _ }) : { x: f, y: _ };
        (f = v.x), (_ = v.y);
        var m = a.hasOwnProperty("x"),
          b = a.hasOwnProperty("y"),
          g = nr,
          y = er,
          x = window;
        if (u) {
          var w = Xn(i),
            $ = "clientHeight",
            O = "clientWidth";
          w === Dn(i) &&
            "static" !== Vn((w = Bn(i))).position &&
            "absolute" === s &&
            (($ = "scrollHeight"), (O = "scrollWidth")),
            (r === er || ((r === nr || r === ir) && o === sr)) &&
              ((y = tr),
              (_ -=
                (d && w === x && x.visualViewport
                  ? x.visualViewport.height
                  : w[$]) - n.height),
              (_ *= l ? 1 : -1)),
            (r !== nr && ((r !== er && r !== tr) || o !== sr)) ||
              ((g = ir),
              (f -=
                (d && w === x && x.visualViewport
                  ? x.visualViewport.width
                  : w[O]) - n.width),
              (f *= l ? 1 : -1));
        }
        var A,
          S = Object.assign({ position: s }, u && wr),
          E =
            !0 === c
              ? (function (e, t) {
                  var i = e.x,
                    n = e.y,
                    r = t.devicePixelRatio || 1;
                  return { x: Pn(i * r) / r || 0, y: Pn(n * r) / r || 0 };
                })({ x: f, y: _ }, Dn(i))
              : { x: f, y: _ };
        return (
          (f = E.x),
          (_ = E.y),
          l
            ? Object.assign(
                {},
                S,
                (((A = {})[y] = b ? "0" : ""),
                (A[g] = m ? "0" : ""),
                (A.transform =
                  (x.devicePixelRatio || 1) <= 1
                    ? "translate(" + f + "px, " + _ + "px)"
                    : "translate3d(" + f + "px, " + _ + "px, 0)"),
                A)
              )
            : Object.assign(
                {},
                S,
                (((t = {})[y] = b ? _ + "px" : ""),
                (t[g] = m ? f + "px" : ""),
                (t.transform = ""),
                t)
              )
        );
      }
      const Or = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (e) {
          var t = e.state;
          Object.keys(t.elements).forEach(function (e) {
            var i = t.styles[e] || {},
              n = t.attributes[e] || {},
              r = t.elements[e];
            Tn(r) &&
              Rn(r) &&
              (Object.assign(r.style, i),
              Object.keys(n).forEach(function (e) {
                var t = n[e];
                !1 === t
                  ? r.removeAttribute(e)
                  : r.setAttribute(e, !0 === t ? "" : t);
              }));
          });
        },
        effect: function (e) {
          var t = e.state,
            i = {
              popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(t.elements.popper.style, i.popper),
            (t.styles = i),
            t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow),
            function () {
              Object.keys(t.elements).forEach(function (e) {
                var n = t.elements[e],
                  r = t.attributes[e] || {},
                  o = Object.keys(
                    t.styles.hasOwnProperty(e) ? t.styles[e] : i[e]
                  ).reduce(function (e, t) {
                    return (e[t] = ""), e;
                  }, {});
                Tn(n) &&
                  Rn(n) &&
                  (Object.assign(n.style, o),
                  Object.keys(r).forEach(function (e) {
                    n.removeAttribute(e);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      };
      var Ar = { left: "right", right: "left", bottom: "top", top: "bottom" };
      function Sr(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return Ar[e];
        });
      }
      var Er = { start: "end", end: "start" };
      function kr(e) {
        return e.replace(/start|end/g, function (e) {
          return Er[e];
        });
      }
      function Mr(e, t) {
        var i = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (i && Ln(i)) {
          var n = t;
          do {
            if (n && e.isSameNode(n)) return !0;
            n = n.parentNode || n.host;
          } while (n);
        }
        return !1;
      }
      function Dr(e) {
        return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height,
        });
      }
      function Cr(e, t, i) {
        return t === lr
          ? Dr(
              (function (e, t) {
                var i = Dn(e),
                  n = Bn(e),
                  r = i.visualViewport,
                  o = n.clientWidth,
                  a = n.clientHeight,
                  s = 0,
                  l = 0;
                if (r) {
                  (o = r.width), (a = r.height);
                  var u = Yn();
                  (u || (!u && "fixed" === t)) &&
                    ((s = r.offsetLeft), (l = r.offsetTop));
                }
                return { width: o, height: a, x: s + Hn(e), y: l };
              })(e, i)
            )
          : Cn(t)
          ? (function (e, t) {
              var i = Kn(e, !1, "fixed" === t);
              return (
                (i.top = i.top + e.clientTop),
                (i.left = i.left + e.clientLeft),
                (i.bottom = i.top + e.clientHeight),
                (i.right = i.left + e.clientWidth),
                (i.width = e.clientWidth),
                (i.height = e.clientHeight),
                (i.x = i.left),
                (i.y = i.top),
                i
              );
            })(t, i)
          : Dr(
              (function (e) {
                var t,
                  i = Bn(e),
                  n = Fn(e),
                  r = null == (t = e.ownerDocument) ? void 0 : t.body,
                  o = In(
                    i.scrollWidth,
                    i.clientWidth,
                    r ? r.scrollWidth : 0,
                    r ? r.clientWidth : 0
                  ),
                  a = In(
                    i.scrollHeight,
                    i.clientHeight,
                    r ? r.scrollHeight : 0,
                    r ? r.clientHeight : 0
                  ),
                  s = -n.scrollLeft + Hn(e),
                  l = -n.scrollTop;
                return (
                  "rtl" === Vn(r || i).direction &&
                    (s += In(i.clientWidth, r ? r.clientWidth : 0) - o),
                  { width: o, height: a, x: s, y: l }
                );
              })(Bn(e))
            );
      }
      function Tr(e) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
      }
      function Lr(e, t) {
        return t.reduce(function (t, i) {
          return (t[i] = e), t;
        }, {});
      }
      function Ir(e, t) {
        void 0 === t && (t = {});
        var i = t,
          n = i.placement,
          r = void 0 === n ? e.placement : n,
          o = i.strategy,
          a = void 0 === o ? e.strategy : o,
          s = i.boundary,
          l = void 0 === s ? "clippingParents" : s,
          u = i.rootBoundary,
          c = void 0 === u ? lr : u,
          d = i.elementContext,
          p = void 0 === d ? ur : d,
          f = i.altBoundary,
          h = void 0 !== f && f,
          _ = i.padding,
          v = void 0 === _ ? 0 : _,
          m = Tr("number" != typeof v ? v : Lr(v, or)),
          b = p === ur ? "reference" : ur,
          g = e.rects.popper,
          y = e.elements[h ? b : p],
          x = (function (e, t, i, n) {
            var r =
                "clippingParents" === t
                  ? (function (e) {
                      var t = Jn(qn(e)),
                        i =
                          ["absolute", "fixed"].indexOf(Vn(e).position) >= 0 &&
                          Tn(e)
                            ? Xn(e)
                            : e;
                      return Cn(i)
                        ? t.filter(function (e) {
                            return Cn(e) && Mr(e, i) && "body" !== Rn(e);
                          })
                        : [];
                    })(e)
                  : [].concat(t),
              o = [].concat(r, [i]),
              a = o[0],
              s = o.reduce(function (t, i) {
                var r = Cr(e, i, n);
                return (
                  (t.top = In(r.top, t.top)),
                  (t.right = Nn(r.right, t.right)),
                  (t.bottom = Nn(r.bottom, t.bottom)),
                  (t.left = In(r.left, t.left)),
                  t
                );
              }, Cr(e, a, n));
            return (
              (s.width = s.right - s.left),
              (s.height = s.bottom - s.top),
              (s.x = s.left),
              (s.y = s.top),
              s
            );
          })(Cn(y) ? y : y.contextElement || Bn(e.elements.popper), l, c, a),
          w = Kn(e.elements.reference),
          $ = xr({
            reference: w,
            element: g,
            strategy: "absolute",
            placement: r,
          }),
          O = Dr(Object.assign({}, g, $)),
          A = p === ur ? O : w,
          S = {
            top: x.top - A.top + m.top,
            bottom: A.bottom - x.bottom + m.bottom,
            left: x.left - A.left + m.left,
            right: A.right - x.right + m.right,
          },
          E = e.modifiersData.offset;
        if (p === ur && E) {
          var k = E[r];
          Object.keys(S).forEach(function (e) {
            var t = [ir, tr].indexOf(e) >= 0 ? 1 : -1,
              i = [er, tr].indexOf(e) >= 0 ? "y" : "x";
            S[e] += k[i] * t;
          });
        }
        return S;
      }
      function Nr(e, t, i) {
        return In(e, Nn(t, i));
      }
      function Pr(e, t, i) {
        return (
          void 0 === i && (i = { x: 0, y: 0 }),
          {
            top: e.top - t.height - i.y,
            right: e.right - t.width + i.x,
            bottom: e.bottom - t.height + i.y,
            left: e.left - t.width - i.x,
          }
        );
      }
      function jr(e) {
        return [er, ir, tr, nr].some(function (t) {
          return e[t] >= 0;
        });
      }
      var Yr = vr({
          defaultModifiers: [
            {
              name: "eventListeners",
              enabled: !0,
              phase: "write",
              fn: function () {},
              effect: function (e) {
                var t = e.state,
                  i = e.instance,
                  n = e.options,
                  r = n.scroll,
                  o = void 0 === r || r,
                  a = n.resize,
                  s = void 0 === a || a,
                  l = Dn(t.elements.popper),
                  u = [].concat(
                    t.scrollParents.reference,
                    t.scrollParents.popper
                  );
                return (
                  o &&
                    u.forEach(function (e) {
                      e.addEventListener("scroll", i.update, mr);
                    }),
                  s && l.addEventListener("resize", i.update, mr),
                  function () {
                    o &&
                      u.forEach(function (e) {
                        e.removeEventListener("scroll", i.update, mr);
                      }),
                      s && l.removeEventListener("resize", i.update, mr);
                  }
                );
              },
              data: {},
            },
            {
              name: "popperOffsets",
              enabled: !0,
              phase: "read",
              fn: function (e) {
                var t = e.state,
                  i = e.name;
                t.modifiersData[i] = xr({
                  reference: t.rects.reference,
                  element: t.rects.popper,
                  strategy: "absolute",
                  placement: t.placement,
                });
              },
              data: {},
            },
            {
              name: "computeStyles",
              enabled: !0,
              phase: "beforeWrite",
              fn: function (e) {
                var t = e.state,
                  i = e.options,
                  n = i.gpuAcceleration,
                  r = void 0 === n || n,
                  o = i.adaptive,
                  a = void 0 === o || o,
                  s = i.roundOffsets,
                  l = void 0 === s || s,
                  u = {
                    placement: br(t.placement),
                    variation: gr(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: r,
                    isFixed: "fixed" === t.options.strategy,
                  };
                null != t.modifiersData.popperOffsets &&
                  (t.styles.popper = Object.assign(
                    {},
                    t.styles.popper,
                    $r(
                      Object.assign({}, u, {
                        offsets: t.modifiersData.popperOffsets,
                        position: t.options.strategy,
                        adaptive: a,
                        roundOffsets: l,
                      })
                    )
                  )),
                  null != t.modifiersData.arrow &&
                    (t.styles.arrow = Object.assign(
                      {},
                      t.styles.arrow,
                      $r(
                        Object.assign({}, u, {
                          offsets: t.modifiersData.arrow,
                          position: "absolute",
                          adaptive: !1,
                          roundOffsets: l,
                        })
                      )
                    )),
                  (t.attributes.popper = Object.assign(
                    {},
                    t.attributes.popper,
                    { "data-popper-placement": t.placement }
                  ));
              },
              data: {},
            },
            Or,
            {
              name: "offset",
              enabled: !0,
              phase: "main",
              requires: ["popperOffsets"],
              fn: function (e) {
                var t = e.state,
                  i = e.options,
                  n = e.name,
                  r = i.offset,
                  o = void 0 === r ? [0, 0] : r,
                  a = dr.reduce(function (e, i) {
                    return (
                      (e[i] = (function (e, t, i) {
                        var n = br(e),
                          r = [nr, er].indexOf(n) >= 0 ? -1 : 1,
                          o =
                            "function" == typeof i
                              ? i(Object.assign({}, t, { placement: e }))
                              : i,
                          a = o[0],
                          s = o[1];
                        return (
                          (a = a || 0),
                          (s = (s || 0) * r),
                          [nr, ir].indexOf(n) >= 0
                            ? { x: s, y: a }
                            : { x: a, y: s }
                        );
                      })(i, t.rects, o)),
                      e
                    );
                  }, {}),
                  s = a[t.placement],
                  l = s.x,
                  u = s.y;
                null != t.modifiersData.popperOffsets &&
                  ((t.modifiersData.popperOffsets.x += l),
                  (t.modifiersData.popperOffsets.y += u)),
                  (t.modifiersData[n] = a);
              },
            },
            {
              name: "flip",
              enabled: !0,
              phase: "main",
              fn: function (e) {
                var t = e.state,
                  i = e.options,
                  n = e.name;
                if (!t.modifiersData[n]._skip) {
                  for (
                    var r = i.mainAxis,
                      o = void 0 === r || r,
                      a = i.altAxis,
                      s = void 0 === a || a,
                      l = i.fallbackPlacements,
                      u = i.padding,
                      c = i.boundary,
                      d = i.rootBoundary,
                      p = i.altBoundary,
                      f = i.flipVariations,
                      h = void 0 === f || f,
                      _ = i.allowedAutoPlacements,
                      v = t.options.placement,
                      m = br(v),
                      b =
                        l ||
                        (m !== v && h
                          ? (function (e) {
                              if (br(e) === rr) return [];
                              var t = Sr(e);
                              return [kr(e), t, kr(t)];
                            })(v)
                          : [Sr(v)]),
                      g = [v].concat(b).reduce(function (e, i) {
                        return e.concat(
                          br(i) === rr
                            ? (function (e, t) {
                                void 0 === t && (t = {});
                                var i = t,
                                  n = i.placement,
                                  r = i.boundary,
                                  o = i.rootBoundary,
                                  a = i.padding,
                                  s = i.flipVariations,
                                  l = i.allowedAutoPlacements,
                                  u = void 0 === l ? dr : l,
                                  c = gr(n),
                                  d = c
                                    ? s
                                      ? cr
                                      : cr.filter(function (e) {
                                          return gr(e) === c;
                                        })
                                    : or,
                                  p = d.filter(function (e) {
                                    return u.indexOf(e) >= 0;
                                  });
                                0 === p.length && (p = d);
                                var f = p.reduce(function (t, i) {
                                  return (
                                    (t[i] = Ir(e, {
                                      placement: i,
                                      boundary: r,
                                      rootBoundary: o,
                                      padding: a,
                                    })[br(i)]),
                                    t
                                  );
                                }, {});
                                return Object.keys(f).sort(function (e, t) {
                                  return f[e] - f[t];
                                });
                              })(t, {
                                placement: i,
                                boundary: c,
                                rootBoundary: d,
                                padding: u,
                                flipVariations: h,
                                allowedAutoPlacements: _,
                              })
                            : i
                        );
                      }, []),
                      y = t.rects.reference,
                      x = t.rects.popper,
                      w = new Map(),
                      $ = !0,
                      O = g[0],
                      A = 0;
                    A < g.length;
                    A++
                  ) {
                    var S = g[A],
                      E = br(S),
                      k = gr(S) === ar,
                      M = [er, tr].indexOf(E) >= 0,
                      D = M ? "width" : "height",
                      C = Ir(t, {
                        placement: S,
                        boundary: c,
                        rootBoundary: d,
                        altBoundary: p,
                        padding: u,
                      }),
                      T = M ? (k ? ir : nr) : k ? tr : er;
                    y[D] > x[D] && (T = Sr(T));
                    var L = Sr(T),
                      I = [];
                    if (
                      (o && I.push(C[E] <= 0),
                      s && I.push(C[T] <= 0, C[L] <= 0),
                      I.every(function (e) {
                        return e;
                      }))
                    ) {
                      (O = S), ($ = !1);
                      break;
                    }
                    w.set(S, I);
                  }
                  if ($)
                    for (
                      var N = function (e) {
                          var t = g.find(function (t) {
                            var i = w.get(t);
                            if (i)
                              return i.slice(0, e).every(function (e) {
                                return e;
                              });
                          });
                          if (t) return (O = t), "break";
                        },
                        P = h ? 3 : 1;
                      P > 0 && "break" !== N(P);
                      P--
                    );
                  t.placement !== O &&
                    ((t.modifiersData[n]._skip = !0),
                    (t.placement = O),
                    (t.reset = !0));
                }
              },
              requiresIfExists: ["offset"],
              data: { _skip: !1 },
            },
            {
              name: "preventOverflow",
              enabled: !0,
              phase: "main",
              fn: function (e) {
                var t = e.state,
                  i = e.options,
                  n = e.name,
                  r = i.mainAxis,
                  o = void 0 === r || r,
                  a = i.altAxis,
                  s = void 0 !== a && a,
                  l = i.boundary,
                  u = i.rootBoundary,
                  c = i.altBoundary,
                  d = i.padding,
                  p = i.tether,
                  f = void 0 === p || p,
                  h = i.tetherOffset,
                  _ = void 0 === h ? 0 : h,
                  v = Ir(t, {
                    boundary: l,
                    rootBoundary: u,
                    padding: d,
                    altBoundary: c,
                  }),
                  m = br(t.placement),
                  b = gr(t.placement),
                  g = !b,
                  y = yr(m),
                  x = "x" === y ? "y" : "x",
                  w = t.modifiersData.popperOffsets,
                  $ = t.rects.reference,
                  O = t.rects.popper,
                  A =
                    "function" == typeof _
                      ? _(
                          Object.assign({}, t.rects, { placement: t.placement })
                        )
                      : _,
                  S =
                    "number" == typeof A
                      ? { mainAxis: A, altAxis: A }
                      : Object.assign({ mainAxis: 0, altAxis: 0 }, A),
                  E = t.modifiersData.offset
                    ? t.modifiersData.offset[t.placement]
                    : null,
                  k = { x: 0, y: 0 };
                if (w) {
                  if (o) {
                    var M,
                      D = "y" === y ? er : nr,
                      C = "y" === y ? tr : ir,
                      T = "y" === y ? "height" : "width",
                      L = w[y],
                      I = L + v[D],
                      N = L - v[C],
                      P = f ? -O[T] / 2 : 0,
                      j = b === ar ? $[T] : O[T],
                      Y = b === ar ? -O[T] : -$[T],
                      K = t.elements.arrow,
                      F = f && K ? Un(K) : { width: 0, height: 0 },
                      R = t.modifiersData["arrow#persistent"]
                        ? t.modifiersData["arrow#persistent"].padding
                        : { top: 0, right: 0, bottom: 0, left: 0 },
                      B = R[D],
                      H = R[C],
                      V = Nr(0, $[T], F[T]),
                      W = g
                        ? $[T] / 2 - P - V - B - S.mainAxis
                        : j - V - B - S.mainAxis,
                      z = g
                        ? -$[T] / 2 + P + V + H + S.mainAxis
                        : Y + V + H + S.mainAxis,
                      U = t.elements.arrow && Xn(t.elements.arrow),
                      q = U
                        ? "y" === y
                          ? U.clientTop || 0
                          : U.clientLeft || 0
                        : 0,
                      Z = null != (M = null == E ? void 0 : E[y]) ? M : 0,
                      J = L + z - Z,
                      G = Nr(f ? Nn(I, L + W - Z - q) : I, L, f ? In(N, J) : N);
                    (w[y] = G), (k[y] = G - L);
                  }
                  if (s) {
                    var Q,
                      X = "x" === y ? er : nr,
                      ee = "x" === y ? tr : ir,
                      te = w[x],
                      ie = "y" === x ? "height" : "width",
                      ne = te + v[X],
                      re = te - v[ee],
                      oe = -1 !== [er, nr].indexOf(m),
                      ae = null != (Q = null == E ? void 0 : E[x]) ? Q : 0,
                      se = oe ? ne : te - $[ie] - O[ie] - ae + S.altAxis,
                      le = oe ? te + $[ie] + O[ie] - ae - S.altAxis : re,
                      ue =
                        f && oe
                          ? (function (e, t, i) {
                              var n = Nr(e, t, i);
                              return n > i ? i : n;
                            })(se, te, le)
                          : Nr(f ? se : ne, te, f ? le : re);
                    (w[x] = ue), (k[x] = ue - te);
                  }
                  t.modifiersData[n] = k;
                }
              },
              requiresIfExists: ["offset"],
            },
            {
              name: "arrow",
              enabled: !0,
              phase: "main",
              fn: function (e) {
                var t,
                  i = e.state,
                  n = e.name,
                  r = e.options,
                  o = i.elements.arrow,
                  a = i.modifiersData.popperOffsets,
                  s = br(i.placement),
                  l = yr(s),
                  u = [nr, ir].indexOf(s) >= 0 ? "height" : "width";
                if (o && a) {
                  var c = (function (e, t) {
                      return Tr(
                        "number" !=
                          typeof (e =
                            "function" == typeof e
                              ? e(
                                  Object.assign({}, t.rects, {
                                    placement: t.placement,
                                  })
                                )
                              : e)
                          ? e
                          : Lr(e, or)
                      );
                    })(r.padding, i),
                    d = Un(o),
                    p = "y" === l ? er : nr,
                    f = "y" === l ? tr : ir,
                    h =
                      i.rects.reference[u] +
                      i.rects.reference[l] -
                      a[l] -
                      i.rects.popper[u],
                    _ = a[l] - i.rects.reference[l],
                    v = Xn(o),
                    m = v
                      ? "y" === l
                        ? v.clientHeight || 0
                        : v.clientWidth || 0
                      : 0,
                    b = h / 2 - _ / 2,
                    g = c[p],
                    y = m - d[u] - c[f],
                    x = m / 2 - d[u] / 2 + b,
                    w = Nr(g, x, y),
                    $ = l;
                  i.modifiersData[n] =
                    (((t = {})[$] = w), (t.centerOffset = w - x), t);
                }
              },
              effect: function (e) {
                var t = e.state,
                  i = e.options.element,
                  n = void 0 === i ? "[data-popper-arrow]" : i;
                null != n &&
                  ("string" != typeof n ||
                    (n = t.elements.popper.querySelector(n))) &&
                  Mr(t.elements.popper, n) &&
                  (t.elements.arrow = n);
              },
              requires: ["popperOffsets"],
              requiresIfExists: ["preventOverflow"],
            },
            {
              name: "hide",
              enabled: !0,
              phase: "main",
              requiresIfExists: ["preventOverflow"],
              fn: function (e) {
                var t = e.state,
                  i = e.name,
                  n = t.rects.reference,
                  r = t.rects.popper,
                  o = t.modifiersData.preventOverflow,
                  a = Ir(t, { elementContext: "reference" }),
                  s = Ir(t, { altBoundary: !0 }),
                  l = Pr(a, n),
                  u = Pr(s, r, o),
                  c = jr(l),
                  d = jr(u);
                (t.modifiersData[i] = {
                  referenceClippingOffsets: l,
                  popperEscapeOffsets: u,
                  isReferenceHidden: c,
                  hasPopperEscaped: d,
                }),
                  (t.attributes.popper = Object.assign(
                    {},
                    t.attributes.popper,
                    {
                      "data-popper-reference-hidden": c,
                      "data-popper-escaped": d,
                    }
                  ));
              },
            },
          ],
        }),
        Kr = "tippy-content",
        Fr = "tippy-backdrop",
        Rr = "tippy-arrow",
        Br = "tippy-svg-arrow",
        Hr = { passive: !0, capture: !0 },
        Vr = function () {
          return document.body;
        };
      function Wr(e, t, i) {
        if (Array.isArray(e)) {
          var n = e[t];
          return null == n ? (Array.isArray(i) ? i[t] : i) : n;
        }
        return e;
      }
      function zr(e, t) {
        var i = {}.toString.call(e);
        return 0 === i.indexOf("[object") && i.indexOf(t + "]") > -1;
      }
      function Ur(e, t) {
        return "function" == typeof e ? e.apply(void 0, t) : e;
      }
      function qr(e, t) {
        return 0 === t
          ? e
          : function (n) {
              clearTimeout(i),
                (i = setTimeout(function () {
                  e(n);
                }, t));
            };
        var i;
      }
      function Zr(e) {
        return [].concat(e);
      }
      function Jr(e, t) {
        -1 === e.indexOf(t) && e.push(t);
      }
      function Gr(e) {
        return [].slice.call(e);
      }
      function Qr(e) {
        return Object.keys(e).reduce(function (t, i) {
          return void 0 !== e[i] && (t[i] = e[i]), t;
        }, {});
      }
      function Xr() {
        return document.createElement("div");
      }
      function eo(e) {
        return ["Element", "Fragment"].some(function (t) {
          return zr(e, t);
        });
      }
      function to(e, t) {
        e.forEach(function (e) {
          e && (e.style.transitionDuration = t + "ms");
        });
      }
      function io(e, t) {
        e.forEach(function (e) {
          e && e.setAttribute("data-state", t);
        });
      }
      function no(e, t, i) {
        var n = t + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
          e[n](t, i);
        });
      }
      function ro(e, t) {
        for (var i = t; i; ) {
          var n;
          if (e.contains(i)) return !0;
          i =
            null == i.getRootNode || null == (n = i.getRootNode())
              ? void 0
              : n.host;
        }
        return !1;
      }
      var oo = { isTouch: !1 },
        ao = 0;
      function so() {
        oo.isTouch ||
          ((oo.isTouch = !0),
          window.performance && document.addEventListener("mousemove", lo));
      }
      function lo() {
        var e = performance.now();
        e - ao < 20 &&
          ((oo.isTouch = !1), document.removeEventListener("mousemove", lo)),
          (ao = e);
      }
      function uo() {
        var e,
          t = document.activeElement;
        if ((e = t) && e._tippy && e._tippy.reference === e) {
          var i = t._tippy;
          t.blur && !i.state.isVisible && t.blur();
        }
      }
      var co = !(
          "undefined" == typeof window ||
          "undefined" == typeof document ||
          !window.msCrypto
        ),
        po = Object.assign(
          {
            appendTo: Vr,
            aria: { content: "auto", expanded: "auto" },
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function () {},
            onBeforeUpdate: function () {},
            onCreate: function () {},
            onDestroy: function () {},
            onHidden: function () {},
            onHide: function () {},
            onMount: function () {},
            onShow: function () {},
            onShown: function () {},
            onTrigger: function () {},
            onUntrigger: function () {},
            onClickOutside: function () {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null,
          },
          {
            animateFill: !1,
            followCursor: !1,
            inlinePositioning: !1,
            sticky: !1,
          },
          {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999,
          }
        ),
        fo = Object.keys(po);
      function ho(e) {
        var t = (e.plugins || []).reduce(function (t, i) {
          var n,
            r = i.name,
            o = i.defaultValue;
          return (
            r && (t[r] = void 0 !== e[r] ? e[r] : null != (n = po[r]) ? n : o),
            t
          );
        }, {});
        return Object.assign({}, e, t);
      }
      function _o(e, t) {
        var i = Object.assign(
          {},
          t,
          { content: Ur(t.content, [e]) },
          t.ignoreAttributes
            ? {}
            : (function (e, t) {
                return (
                  t
                    ? Object.keys(ho(Object.assign({}, po, { plugins: t })))
                    : fo
                ).reduce(function (t, i) {
                  var n = (e.getAttribute("data-tippy-" + i) || "").trim();
                  if (!n) return t;
                  if ("content" === i) t[i] = n;
                  else
                    try {
                      t[i] = JSON.parse(n);
                    } catch (e) {
                      t[i] = n;
                    }
                  return t;
                }, {});
              })(e, t.plugins)
        );
        return (
          (i.aria = Object.assign({}, po.aria, i.aria)),
          (i.aria = {
            expanded:
              "auto" === i.aria.expanded ? t.interactive : i.aria.expanded,
            content:
              "auto" === i.aria.content
                ? t.interactive
                  ? null
                  : "describedby"
                : i.aria.content,
          }),
          i
        );
      }
      var vo = function () {
        return "innerHTML";
      };
      function mo(e, t) {
        e[vo()] = t;
      }
      function bo(e) {
        var t = Xr();
        return (
          !0 === e
            ? (t.className = Rr)
            : ((t.className = Br), eo(e) ? t.appendChild(e) : mo(t, e)),
          t
        );
      }
      function go(e, t) {
        eo(t.content)
          ? (mo(e, ""), e.appendChild(t.content))
          : "function" != typeof t.content &&
            (t.allowHTML ? mo(e, t.content) : (e.textContent = t.content));
      }
      function yo(e) {
        var t = e.firstElementChild,
          i = Gr(t.children);
        return {
          box: t,
          content: i.find(function (e) {
            return e.classList.contains(Kr);
          }),
          arrow: i.find(function (e) {
            return e.classList.contains(Rr) || e.classList.contains(Br);
          }),
          backdrop: i.find(function (e) {
            return e.classList.contains(Fr);
          }),
        };
      }
      function xo(e) {
        var t = Xr(),
          i = Xr();
        (i.className = "tippy-box"),
          i.setAttribute("data-state", "hidden"),
          i.setAttribute("tabindex", "-1");
        var n = Xr();
        function r(i, n) {
          var r = yo(t),
            o = r.box,
            a = r.content,
            s = r.arrow;
          n.theme
            ? o.setAttribute("data-theme", n.theme)
            : o.removeAttribute("data-theme"),
            "string" == typeof n.animation
              ? o.setAttribute("data-animation", n.animation)
              : o.removeAttribute("data-animation"),
            n.inertia
              ? o.setAttribute("data-inertia", "")
              : o.removeAttribute("data-inertia"),
            (o.style.maxWidth =
              "number" == typeof n.maxWidth ? n.maxWidth + "px" : n.maxWidth),
            n.role ? o.setAttribute("role", n.role) : o.removeAttribute("role"),
            (i.content === n.content && i.allowHTML === n.allowHTML) ||
              go(a, e.props),
            n.arrow
              ? s
                ? i.arrow !== n.arrow &&
                  (o.removeChild(s), o.appendChild(bo(n.arrow)))
                : o.appendChild(bo(n.arrow))
              : s && o.removeChild(s);
        }
        return (
          (n.className = Kr),
          n.setAttribute("data-state", "hidden"),
          go(n, e.props),
          t.appendChild(i),
          i.appendChild(n),
          r(e.props, e.props),
          { popper: t, onUpdate: r }
        );
      }
      xo.$$tippy = !0;
      var wo = 1,
        $o = [],
        Oo = [];
      function Ao(e, t) {
        var i,
          n,
          r,
          o,
          a,
          s,
          l,
          u,
          c = _o(e, Object.assign({}, po, ho(Qr(t)))),
          d = !1,
          p = !1,
          f = !1,
          h = !1,
          _ = [],
          v = qr(U, c.interactiveDebounce),
          m = wo++,
          b = (u = c.plugins).filter(function (e, t) {
            return u.indexOf(e) === t;
          }),
          g = {
            id: m,
            reference: e,
            popper: Xr(),
            popperInstance: null,
            props: c,
            state: {
              isEnabled: !0,
              isVisible: !1,
              isDestroyed: !1,
              isMounted: !1,
              isShown: !1,
            },
            plugins: b,
            clearDelayTimeouts: function () {
              clearTimeout(i), clearTimeout(n), cancelAnimationFrame(r);
            },
            setProps: function (t) {
              if (!g.state.isDestroyed) {
                L("onBeforeUpdate", [g, t]), W();
                var i = g.props,
                  n = _o(
                    e,
                    Object.assign({}, i, Qr(t), { ignoreAttributes: !0 })
                  );
                (g.props = n),
                  V(),
                  i.interactiveDebounce !== n.interactiveDebounce &&
                    (P(), (v = qr(U, n.interactiveDebounce))),
                  i.triggerTarget && !n.triggerTarget
                    ? Zr(i.triggerTarget).forEach(function (e) {
                        e.removeAttribute("aria-expanded");
                      })
                    : n.triggerTarget && e.removeAttribute("aria-expanded"),
                  N(),
                  T(),
                  w && w(i, n),
                  g.popperInstance &&
                    (G(),
                    X().forEach(function (e) {
                      requestAnimationFrame(
                        e._tippy.popperInstance.forceUpdate
                      );
                    })),
                  L("onAfterUpdate", [g, t]);
              }
            },
            setContent: function (e) {
              g.setProps({ content: e });
            },
            show: function () {
              var e = g.state.isVisible,
                t = g.state.isDestroyed,
                i = !g.state.isEnabled,
                n = oo.isTouch && !g.props.touch,
                r = Wr(g.props.duration, 0, po.duration);
              if (
                !(
                  e ||
                  t ||
                  i ||
                  n ||
                  k().hasAttribute("disabled") ||
                  (L("onShow", [g], !1), !1 === g.props.onShow(g))
                )
              ) {
                if (
                  ((g.state.isVisible = !0),
                  E() && (x.style.visibility = "visible"),
                  T(),
                  F(),
                  g.state.isMounted || (x.style.transition = "none"),
                  E())
                ) {
                  var o = D();
                  to([o.box, o.content], 0);
                }
                var a, l, u;
                (s = function () {
                  var e;
                  if (g.state.isVisible && !h) {
                    if (
                      ((h = !0),
                      x.offsetHeight,
                      (x.style.transition = g.props.moveTransition),
                      E() && g.props.animation)
                    ) {
                      var t = D(),
                        i = t.box,
                        n = t.content;
                      to([i, n], r), io([i, n], "visible");
                    }
                    I(),
                      N(),
                      Jr(Oo, g),
                      null == (e = g.popperInstance) || e.forceUpdate(),
                      L("onMount", [g]),
                      g.props.animation &&
                        E() &&
                        (function (e, t) {
                          B(e, function () {
                            (g.state.isShown = !0), L("onShown", [g]);
                          });
                        })(r);
                  }
                }),
                  (l = g.props.appendTo),
                  (u = k()),
                  (a =
                    (g.props.interactive && l === Vr) || "parent" === l
                      ? u.parentNode
                      : Ur(l, [u])).contains(x) || a.appendChild(x),
                  (g.state.isMounted = !0),
                  G();
              }
            },
            hide: function () {
              var e = !g.state.isVisible,
                t = g.state.isDestroyed,
                i = !g.state.isEnabled,
                n = Wr(g.props.duration, 1, po.duration);
              if (
                !(e || t || i) &&
                (L("onHide", [g], !1), !1 !== g.props.onHide(g))
              ) {
                if (
                  ((g.state.isVisible = !1),
                  (g.state.isShown = !1),
                  (h = !1),
                  (d = !1),
                  E() && (x.style.visibility = "hidden"),
                  P(),
                  R(),
                  T(!0),
                  E())
                ) {
                  var r = D(),
                    o = r.box,
                    a = r.content;
                  g.props.animation && (to([o, a], n), io([o, a], "hidden"));
                }
                I(),
                  N(),
                  g.props.animation
                    ? E() &&
                      (function (e, t) {
                        B(e, function () {
                          !g.state.isVisible &&
                            x.parentNode &&
                            x.parentNode.contains(x) &&
                            t();
                        });
                      })(n, g.unmount)
                    : g.unmount();
              }
            },
            hideWithInteractivity: function (e) {
              M().addEventListener("mousemove", v), Jr($o, v), v(e);
            },
            enable: function () {
              g.state.isEnabled = !0;
            },
            disable: function () {
              g.hide(), (g.state.isEnabled = !1);
            },
            unmount: function () {
              g.state.isVisible && g.hide(),
                g.state.isMounted &&
                  (Q(),
                  X().forEach(function (e) {
                    e._tippy.unmount();
                  }),
                  x.parentNode && x.parentNode.removeChild(x),
                  (Oo = Oo.filter(function (e) {
                    return e !== g;
                  })),
                  (g.state.isMounted = !1),
                  L("onHidden", [g]));
            },
            destroy: function () {
              g.state.isDestroyed ||
                (g.clearDelayTimeouts(),
                g.unmount(),
                W(),
                delete e._tippy,
                (g.state.isDestroyed = !0),
                L("onDestroy", [g]));
            },
          };
        if (!c.render) return g;
        var y = c.render(g),
          x = y.popper,
          w = y.onUpdate;
        x.setAttribute("data-tippy-root", ""),
          (x.id = "tippy-" + g.id),
          (g.popper = x),
          (e._tippy = g),
          (x._tippy = g);
        var $ = b.map(function (e) {
            return e.fn(g);
          }),
          O = e.hasAttribute("aria-expanded");
        return (
          V(),
          N(),
          T(),
          L("onCreate", [g]),
          c.showOnCreate && ee(),
          x.addEventListener("mouseenter", function () {
            g.props.interactive && g.state.isVisible && g.clearDelayTimeouts();
          }),
          x.addEventListener("mouseleave", function () {
            g.props.interactive &&
              g.props.trigger.indexOf("mouseenter") >= 0 &&
              M().addEventListener("mousemove", v);
          }),
          g
        );
        function A() {
          var e = g.props.touch;
          return Array.isArray(e) ? e : [e, 0];
        }
        function S() {
          return "hold" === A()[0];
        }
        function E() {
          var e;
          return !(null == (e = g.props.render) || !e.$$tippy);
        }
        function k() {
          return l || e;
        }
        function M() {
          var e,
            t,
            i = k().parentNode;
          return i
            ? null != (t = Zr(i)[0]) && null != (e = t.ownerDocument) && e.body
              ? t.ownerDocument
              : document
            : document;
        }
        function D() {
          return yo(x);
        }
        function C(e) {
          return (g.state.isMounted && !g.state.isVisible) ||
            oo.isTouch ||
            (o && "focus" === o.type)
            ? 0
            : Wr(g.props.delay, e ? 0 : 1, po.delay);
        }
        function T(e) {
          void 0 === e && (e = !1),
            (x.style.pointerEvents = g.props.interactive && !e ? "" : "none"),
            (x.style.zIndex = "" + g.props.zIndex);
        }
        function L(e, t, i) {
          var n;
          void 0 === i && (i = !0),
            $.forEach(function (i) {
              i[e] && i[e].apply(i, t);
            }),
            i && (n = g.props)[e].apply(n, t);
        }
        function I() {
          var t = g.props.aria;
          if (t.content) {
            var i = "aria-" + t.content,
              n = x.id;
            Zr(g.props.triggerTarget || e).forEach(function (e) {
              var t = e.getAttribute(i);
              if (g.state.isVisible) e.setAttribute(i, t ? t + " " + n : n);
              else {
                var r = t && t.replace(n, "").trim();
                r ? e.setAttribute(i, r) : e.removeAttribute(i);
              }
            });
          }
        }
        function N() {
          !O &&
            g.props.aria.expanded &&
            Zr(g.props.triggerTarget || e).forEach(function (e) {
              g.props.interactive
                ? e.setAttribute(
                    "aria-expanded",
                    g.state.isVisible && e === k() ? "true" : "false"
                  )
                : e.removeAttribute("aria-expanded");
            });
        }
        function P() {
          M().removeEventListener("mousemove", v),
            ($o = $o.filter(function (e) {
              return e !== v;
            }));
        }
        function j(t) {
          if (!oo.isTouch || (!f && "mousedown" !== t.type)) {
            var i = (t.composedPath && t.composedPath()[0]) || t.target;
            if (!g.props.interactive || !ro(x, i)) {
              if (
                Zr(g.props.triggerTarget || e).some(function (e) {
                  return ro(e, i);
                })
              ) {
                if (oo.isTouch) return;
                if (g.state.isVisible && g.props.trigger.indexOf("click") >= 0)
                  return;
              } else L("onClickOutside", [g, t]);
              !0 === g.props.hideOnClick &&
                (g.clearDelayTimeouts(),
                g.hide(),
                (p = !0),
                setTimeout(function () {
                  p = !1;
                }),
                g.state.isMounted || R());
            }
          }
        }
        function Y() {
          f = !0;
        }
        function K() {
          f = !1;
        }
        function F() {
          var e = M();
          e.addEventListener("mousedown", j, !0),
            e.addEventListener("touchend", j, Hr),
            e.addEventListener("touchstart", K, Hr),
            e.addEventListener("touchmove", Y, Hr);
        }
        function R() {
          var e = M();
          e.removeEventListener("mousedown", j, !0),
            e.removeEventListener("touchend", j, Hr),
            e.removeEventListener("touchstart", K, Hr),
            e.removeEventListener("touchmove", Y, Hr);
        }
        function B(e, t) {
          var i = D().box;
          function n(e) {
            e.target === i && (no(i, "remove", n), t());
          }
          if (0 === e) return t();
          no(i, "remove", a), no(i, "add", n), (a = n);
        }
        function H(t, i, n) {
          void 0 === n && (n = !1),
            Zr(g.props.triggerTarget || e).forEach(function (e) {
              e.addEventListener(t, i, n),
                _.push({ node: e, eventType: t, handler: i, options: n });
            });
        }
        function V() {
          var e;
          S() &&
            (H("touchstart", z, { passive: !0 }),
            H("touchend", q, { passive: !0 })),
            ((e = g.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
              function (e) {
                if ("manual" !== e)
                  switch ((H(e, z), e)) {
                    case "mouseenter":
                      H("mouseleave", q);
                      break;
                    case "focus":
                      H(co ? "focusout" : "blur", Z);
                      break;
                    case "focusin":
                      H("focusout", Z);
                  }
              }
            );
        }
        function W() {
          _.forEach(function (e) {
            var t = e.node,
              i = e.eventType,
              n = e.handler,
              r = e.options;
            t.removeEventListener(i, n, r);
          }),
            (_ = []);
        }
        function z(e) {
          var t,
            i = !1;
          if (g.state.isEnabled && !J(e) && !p) {
            var n = "focus" === (null == (t = o) ? void 0 : t.type);
            (o = e),
              (l = e.currentTarget),
              N(),
              !g.state.isVisible &&
                zr(e, "MouseEvent") &&
                $o.forEach(function (t) {
                  return t(e);
                }),
              "click" === e.type &&
              (g.props.trigger.indexOf("mouseenter") < 0 || d) &&
              !1 !== g.props.hideOnClick &&
              g.state.isVisible
                ? (i = !0)
                : ee(e),
              "click" === e.type && (d = !i),
              i && !n && te(e);
          }
        }
        function U(e) {
          var t = e.target,
            i = k().contains(t) || x.contains(t);
          if ("mousemove" !== e.type || !i) {
            var n = X()
              .concat(x)
              .map(function (e) {
                var t,
                  i = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
                return i
                  ? {
                      popperRect: e.getBoundingClientRect(),
                      popperState: i,
                      props: c,
                    }
                  : null;
              })
              .filter(Boolean);
            (function (e, t) {
              var i = t.clientX,
                n = t.clientY;
              return e.every(function (e) {
                var t = e.popperRect,
                  r = e.popperState,
                  o = e.props.interactiveBorder,
                  a = r.placement.split("-")[0],
                  s = r.modifiersData.offset;
                if (!s) return !0;
                var l = "bottom" === a ? s.top.y : 0,
                  u = "top" === a ? s.bottom.y : 0,
                  c = "right" === a ? s.left.x : 0,
                  d = "left" === a ? s.right.x : 0,
                  p = t.top - n + l > o,
                  f = n - t.bottom - u > o,
                  h = t.left - i + c > o,
                  _ = i - t.right - d > o;
                return p || f || h || _;
              });
            })(n, e) && (P(), te(e));
          }
        }
        function q(e) {
          J(e) ||
            (g.props.trigger.indexOf("click") >= 0 && d) ||
            (g.props.interactive ? g.hideWithInteractivity(e) : te(e));
        }
        function Z(e) {
          (g.props.trigger.indexOf("focusin") < 0 && e.target !== k()) ||
            (g.props.interactive &&
              e.relatedTarget &&
              x.contains(e.relatedTarget)) ||
            te(e);
        }
        function J(e) {
          return !!oo.isTouch && S() !== e.type.indexOf("touch") >= 0;
        }
        function G() {
          Q();
          var t = g.props,
            i = t.popperOptions,
            n = t.placement,
            r = t.offset,
            o = t.getReferenceClientRect,
            a = t.moveTransition,
            l = E() ? yo(x).arrow : null,
            u = o
              ? {
                  getBoundingClientRect: o,
                  contextElement: o.contextElement || k(),
                }
              : e,
            c = [
              { name: "offset", options: { offset: r } },
              {
                name: "preventOverflow",
                options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
              },
              { name: "flip", options: { padding: 5 } },
              { name: "computeStyles", options: { adaptive: !a } },
              {
                name: "$$tippy",
                enabled: !0,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                fn: function (e) {
                  var t = e.state;
                  if (E()) {
                    var i = D().box;
                    ["placement", "reference-hidden", "escaped"].forEach(
                      function (e) {
                        "placement" === e
                          ? i.setAttribute("data-placement", t.placement)
                          : t.attributes.popper["data-popper-" + e]
                          ? i.setAttribute("data-" + e, "")
                          : i.removeAttribute("data-" + e);
                      }
                    ),
                      (t.attributes.popper = {});
                  }
                },
              },
            ];
          E() &&
            l &&
            c.push({ name: "arrow", options: { element: l, padding: 3 } }),
            c.push.apply(c, (null == i ? void 0 : i.modifiers) || []),
            (g.popperInstance = Yr(
              u,
              x,
              Object.assign({}, i, {
                placement: n,
                onFirstUpdate: s,
                modifiers: c,
              })
            ));
        }
        function Q() {
          g.popperInstance &&
            (g.popperInstance.destroy(), (g.popperInstance = null));
        }
        function X() {
          return Gr(x.querySelectorAll("[data-tippy-root]"));
        }
        function ee(e) {
          g.clearDelayTimeouts(), e && L("onTrigger", [g, e]), F();
          var t = C(!0),
            n = A(),
            r = n[0],
            o = n[1];
          oo.isTouch && "hold" === r && o && (t = o),
            t
              ? (i = setTimeout(function () {
                  g.show();
                }, t))
              : g.show();
        }
        function te(e) {
          if (
            (g.clearDelayTimeouts(),
            L("onUntrigger", [g, e]),
            g.state.isVisible)
          ) {
            if (
              !(
                g.props.trigger.indexOf("mouseenter") >= 0 &&
                g.props.trigger.indexOf("click") >= 0 &&
                ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
                d
              )
            ) {
              var t = C(!1);
              t
                ? (n = setTimeout(function () {
                    g.state.isVisible && g.hide();
                  }, t))
                : (r = requestAnimationFrame(function () {
                    g.hide();
                  }));
            }
          } else R();
        }
      }
      function So(e, t) {
        void 0 === t && (t = {});
        var i = po.plugins.concat(t.plugins || []);
        document.addEventListener("touchstart", so, Hr),
          window.addEventListener("blur", uo);
        var n,
          r = Object.assign({}, t, { plugins: i }),
          o = ((n = e),
          eo(n)
            ? [n]
            : (function (e) {
                return zr(e, "NodeList");
              })(n)
            ? Gr(n)
            : Array.isArray(n)
            ? n
            : Gr(document.querySelectorAll(n))).reduce(function (e, t) {
            var i = t && Ao(t, r);
            return i && e.push(i), e;
          }, []);
        return eo(e) ? o[0] : o;
      }
      (So.defaultProps = po),
        (So.setDefaultProps = function (e) {
          Object.keys(e).forEach(function (t) {
            po[t] = e[t];
          });
        }),
        (So.currentInput = oo),
        Object.assign({}, Or, {
          effect: function (e) {
            var t = e.state,
              i = {
                popper: {
                  position: t.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              };
            Object.assign(t.elements.popper.style, i.popper),
              (t.styles = i),
              t.elements.arrow &&
                Object.assign(t.elements.arrow.style, i.arrow);
          },
        }),
        So.setDefaultProps({ render: xo });
      const Eo = So;
      function ko() {
        if (null != Alpine.store("user").userConfig.timezone)
          return Alpine.store("user").userConfig.timezone;
        let e = null;
        return (
          Intl.DateTimeFormat().resolvedOptions().timeZone &&
            (e = Intl.DateTimeFormat().resolvedOptions().timeZone),
          e
        );
      }
      const Mo = {
        fetchAPI: async function (e, t, i) {
          ((i = i || {}).showLoading =
            void 0 !== i.showLoading && i.showLoading),
            (i.showNotification =
              void 0 === i.showNotification || i.showNotification),
            (i.endpoint = void 0 === i.endpoint ? API_ENDPOINT : i.endpoint),
            i.showLoading && Alpine.store("meta").setLoading(!0);
          let n = await fetch(
            i.endpoint + e,
            (function (e) {
              const t = { ...e };
              return (
                (t.credentials = "include"),
                Alpine.store("meta").csrfToken &&
                  (t.headers = {
                    ...t.headers,
                    "X-CSRF-TOKEN": Alpine.store("meta").csrfToken,
                  }),
                t
              );
            })(t)
          )
            .then(async function (e) {
              if (204 === e.status) return {};
              {
                const t = await e.json();
                if (!e.ok) throw t.error.message;
                return t;
              }
            })
            .then(function (e) {
              return e;
            })
            .catch(function (e) {
              return (
                (e = e || L.request_help),
                i.showNotification &&
                  Alpine.store("notification").show({
                    title: L.request_failed,
                    type: "error",
                    description: e,
                  }),
                { error: { message: e } }
              );
            });
          return i.showLoading && Alpine.store("meta").setLoading(!1), n;
        },
        getLanguage: function () {
          if (null != Alpine.store("user").userConfig.language)
            return Alpine.store("user").userConfig.language;
          let e;
          if (navigator.languages && navigator.languages.length > 0)
            navigator.languages.forEach((t) => {
              if (e) return;
              const i = t.match(/(^\w+)-/);
              i &&
                Alpine.store("meta").availableLanguages.indexOf(i[1]) > -1 &&
                (e = i[1]);
            });
          else {
            const t = navigator.language.match(/(^\w+)-/);
            t &&
              Alpine.store("meta").availableLanguages.indexOf(t[1]) > -1 &&
              (e = t[1]);
          }
          return e || (e = "en"), e;
        },
        getLocale: function () {
          return null != Alpine.store("user").userConfig.locale
            ? Alpine.store("user").userConfig.locale
            : navigator.language;
        },
        getTimezone: ko,
        getClockType: function () {
          return null != Alpine.store("user").userConfig.clockType
            ? Alpine.store("user").userConfig.clockType
            : new Date().toLocaleTimeString().match(/(am|pm)/i)
            ? "12h"
            : "24h";
        },
        getFirstDayOfWeek: function () {
          if (null != Alpine.store("user").userConfig.firstDayOfWeek)
            return Alpine.store("user").userConfig.firstDayOfWeek;
          const e = navigator.language.match(
            /^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i
          );
          return (function (e, t) {
            const i = "AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),
              n =
                "AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(
                  /../g
                ),
              r =
                "amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(
                  /../g
                );
            return e
              ? n.includes(e)
                ? 0
                : i.includes(e)
                ? 6
                : 1
              : r.includes(t)
              ? 0
              : ["ar", "arq", "arz", "fa"].includes(t)
              ? 6
              : 1;
          })(e[4], e[1]);
        },
        toCamelCaseKeys: function e(t) {
          return Array.isArray(t)
            ? t.map((t) => e(t))
            : null != t && t.constructor === Object
            ? Object.keys(t).reduce((i, n) => {
                return {
                  ...i,
                  [((r = n),
                  r
                    ? String(r)
                        .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
                        .replace(/[^A-Za-z0-9]+/g, "$")
                        .replace(/([a-z])([A-Z])/g, (e, t, i) => `${t}$${i}`)
                        .toLowerCase()
                        .replace(/(\$)(\w)/g, (e, t, i) => i.toUpperCase())
                    : "")]: e(t[n]),
                };
                var r;
              }, {})
            : t;
        },
        toSnakeCaseKeys: function e(t) {
          return Array.isArray(t)
            ? t.map((t) => e(t))
            : null != t && t.constructor === Object
            ? Object.keys(t).reduce((i, n) => {
                return {
                  ...i,
                  [((r = n),
                  r
                    ? String(r)
                        .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
                        .replace(
                          /([a-z])([A-Z])/g,
                          (e, t, i) => t + "_" + i.toLowerCase()
                        )
                        .replace(/[^A-Za-z0-9]+|_+/g, "_")
                        .toLowerCase()
                    : "")]: e(t[n]),
                };
                var r;
              }, {})
            : t;
        },
        placeholder: function (e, t) {
          return (
            Object.keys(t).forEach((i) => {
              let n = new RegExp("{" + i + "}", "gi");
              e = e.replace(n, t[i]);
            }),
            e
          );
        },
        allowLinks: function (e) {
          var t;
          return (
            (t = /\[([^\]]+)\]\(([^\)]+)\)/gim),
            (function (e) {
              var t = "";
              if (e.match(/\[([^\]]+)\]\(([^\)]+)\)/)) t = e;
              else {
                t = (t = (t = e.replace(
                  /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
                  "[$1]($1)"
                )).replace(
                  /(^|[^\/])(www\.[\S]+(\b|$))/gim,
                  "$1[$2](https://$2)"
                )).replace(
                  /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim,
                  "[$1](mailto:$1)"
                );
              }
              return t;
            })((e = e.replace(/<([^>]+)>/gi, ""))).replace(
              t,
              '<a href="$2" target="_blank" class="text-indigo-500 custom-input-highlight-text" rel="nofollow">$1</a>'
            )
          );
        },
        logEvent: async function (e, t) {
          ((t = t || {}).page = {
            ref: document.referrer,
            title: document.title,
            url: window.location.href,
          }),
            (t.client = {
              screen: window.screen.width + "x" + window.screen.height,
            });
          const i = { type: e, params: t };
          await fetch(LOG_ENDPOINT + "/log", {
            method: "POST",
            "X-CSRF-TOKEN": Alpine.store("meta").csrfToken,
            credentials: "include",
            body: btoa(encodeURI(JSON.stringify(i))),
          });
        },
        formatEpoch: function (e, t, i) {
          if (0 === (e = parseInt(e))) return 0;
          let n;
          return (
            i || (i = ko()),
            "month" === t
              ? (n = "MMM")
              : "date" === t
              ? (n = "D")
              : "day" === t
              ? (n = "ddd")
              : "time" === t
              ? ((n = "HH:mm"),
                "12h" === strawpoll.getClockType() && (n = "h:mm A"))
              : "full" === t
              ? ((n = "LL HH:mm"),
                "12h" === strawpoll.getClockType() && (n = "LL h:mm A"))
              : "local_date" === t && (n = "ll"),
            dayjs(new Date(1e3 * e))
              .tz(i)
              .format(n)
          );
        },
        secondsToTime: function (e) {
          e = Number(e);
          const t = Math.floor(e / 86400),
            i = Math.floor((e % 86400) / 3600),
            n = Math.floor((e % 3600) / 60),
            r = Math.floor(e % 60);
          let o, a, s, l;
          return (
            (o = a = s = l = ""),
            (o = t > 0 ? t + " " + (1 == t ? L.day : L.days) : ""),
            (a = i > 0 ? i + " " + (1 == i ? L.hour : L.hours) : ""),
            "" === o &&
              (s = n > 0 ? n + " " + (1 == n ? L.minute : L.minutes) : ""),
            "" === s &&
              (l = r > 0 ? r + " " + (1 == r ? L.second : L.seconds) : ""),
            [o, a, s, l].filter(Boolean).join(", ")
          );
        },
      };
      (Storage.prototype.set = function (e, t) {
        var i = typeof t;
        return (
          ("undefined" !== i && null !== t) || this.removeItem(e),
          this.setItem(e, "object" === i ? JSON.stringify(t) : t),
          t
        );
      }),
        (Storage.prototype.get = function (e) {
          var t = this.getItem(e);
          try {
            var i = JSON.parse(t);
            if (i && "object" == typeof i) return i;
          } catch (e) {}
          return t;
        }),
        (Storage.prototype.assign = function (e, t) {
          var i = this.get(e);
          return "object" != typeof i || "object" != typeof t
            ? null
            : (Object.assign(i, t), this.set(e, i));
        }),
        (Storage.prototype.has = window.hasOwnProperty),
        (Storage.prototype.remove = window.removeItem),
        (Storage.prototype.keys = function () {
          return Object.keys(this.valueOf());
        });
      var Do = ["second", "minute", "hour", "day", "week", "month", "year"],
        Co = ["ç§’", "åˆ†é’Ÿ", "å°æ—¶", "å¤©", "å‘¨", "ä¸ªæœˆ", "å¹´"],
        To = {},
        Lo = function (e, t) {
          To[e] = t;
        },
        Io = function (e) {
          return To[e] || To.en_US;
        },
        No = [60, 60, 24, 7, 365 / 7 / 12, 12];
      function Po(e) {
        return e instanceof Date
          ? e
          : !isNaN(e) || /^\d+$/.test(e)
          ? new Date(parseInt(e))
          : ((e = (e || "")
              .trim()
              .replace(/\.\d+/, "")
              .replace(/-/, "/")
              .replace(/-/, "/")
              .replace(/(\d)T(\d)/, "$1 $2")
              .replace(/Z/, " UTC")
              .replace(/([+-]\d\d):?(\d\d)/, " $1$2")),
            new Date(e));
      }
      function jo(e, t) {
        for (
          var i = e < 0 ? 1 : 0, n = (e = Math.abs(e)), r = 0;
          e >= No[r] && r < No.length;
          r++
        )
          e /= No[r];
        return (
          (e = Math.floor(e)) > (0 == (r *= 2) ? 9 : 1) && (r += 1),
          t(e, r, n)[i].replace("%s", e.toString())
        );
      }
      function Yo(e, t) {
        return (+(t ? Po(t) : new Date()) - +Po(e)) / 1e3;
      }
      var Ko = function (e, t, i) {
          return jo(Yo(e, i && i.relativeDate), Io(t));
        },
        Fo = "timeago-id";
      function Ro(e) {
        return parseInt(e.getAttribute(Fo));
      }
      var Bo = {},
        Ho = function (e) {
          clearTimeout(e), delete Bo[e];
        };
      function Vo(e, t, i, n) {
        Ho(Ro(e));
        var r = n.relativeDate,
          o = n.minInterval,
          a = Yo(t, r);
        e.innerText = jo(a, i);
        var s = setTimeout(
          function () {
            Vo(e, t, i, n);
          },
          Math.min(
            1e3 *
              Math.max(
                (function (e) {
                  for (
                    var t = 1, i = 0, n = Math.abs(e);
                    e >= No[i] && i < No.length;
                    i++
                  )
                    (e /= No[i]), (t *= No[i]);
                  return (n = (n %= t) ? t - n : t), Math.ceil(n);
                })(a),
                o || 1
              ),
            2147483647
          )
        );
        (Bo[s] = 0),
          (function (e, t) {
            e.setAttribute(Fo, t);
          })(e, s);
      }
      function Wo(e) {
        e ? Ho(Ro(e)) : Object.keys(Bo).forEach(Ho);
      }
      function zo(e, t, i) {
        var n = e.length ? e : [e];
        return (
          n.forEach(function (e) {
            Vo(
              e,
              (function (e) {
                return e.getAttribute("datetime");
              })(e),
              Io(t),
              i || {}
            );
          }),
          n
        );
      }
      Lo("en_US", function (e, t) {
        if (0 === t) return ["just now", "right now"];
        var i = Do[Math.floor(t / 2)];
        return e > 1 && (i += "s"), [e + " " + i + " ago", "in " + e + " " + i];
      }),
        Lo("zh_CN", function (e, t) {
          if (0 === t) return ["åˆšåˆš", "ç‰‡åˆ»åŽ"];
          var i = Co[~~(t / 2)];
          return [e + " " + i + "å‰", e + " " + i + "åŽ"];
        });
      var Uo = i(506),
        qo = i(971),
        Zo = i(23),
        Jo = i(99);
      "function" != typeof window.queueMicrotask &&
        (window.queueMicrotask = function (e) {
          Promise.resolve()
            .then(e)
            .catch((e) =>
              setTimeout(() => {
                throw e;
              })
            );
        }),
        Array.prototype.flat ||
          Object.defineProperty(Array.prototype, "flat", {
            configurable: !0,
            value: function e() {
              var t = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
              return t
                ? Array.prototype.reduce.call(
                    this,
                    function (i, n) {
                      return (
                        Array.isArray(n)
                          ? i.push.apply(i, e.call(n, t - 1))
                          : i.push(n),
                        i
                      );
                    },
                    []
                  )
                : Array.prototype.slice.call(this);
            },
            writable: !0,
          }),
        Array.prototype.flatMap ||
          Object.defineProperty(Array.prototype, "flatMap", {
            configurable: !0,
            value: function (e) {
              return Array.prototype.map.apply(this, arguments).flat();
            },
            writable: !0,
          }),
        document.addEventListener("alpine:init", () => {
          An.magic("tooltip", (e) => (t) => {
            let i = Eo(e, { content: t, trigger: "manual", allowHTML: !0 });
            i.show(),
              setTimeout(() => {
                i.hide(), setTimeout(() => i.destroy(), 150);
              }, 2e3);
          }),
            An.directive("tooltip", (e, { expression: t }) => {
              Eo(e, { content: t, allowHTML: !0 });
            });
        }),
        An.plugin(function (e) {
          (function (e) {
            e
              .directive("combobox", (i, r, { evaluate: a }) => {
                "input" === r.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "x-ref": "__input",
                        ":id"() {
                          return this.$id("alpine-combobox-input");
                        },
                        role: "combobox",
                        tabindex: "0",
                        "aria-autocomplete": "list",
                        async ":aria-controls"() {
                          return await o(
                            () =>
                              this.$refs.__options && this.$refs.__options.id
                          );
                        },
                        ":aria-expanded"() {
                          return this.$data.__isDisabled
                            ? void 0
                            : this.$data.__isOpen;
                        },
                        ":aria-multiselectable"() {
                          return !!this.$data.__isMultiple || void 0;
                        },
                        ":aria-activedescendant"() {
                          if (!this.$data.__context.hasActive()) return;
                          let e = this.$data.__context.getActiveItem();
                          return e ? e.el.id : null;
                        },
                        ":aria-labelledby"() {
                          return this.$refs.__label
                            ? this.$refs.__label.id
                            : this.$refs.__button
                            ? this.$refs.__button.id
                            : null;
                        },
                        "x-init"() {
                          let e = t.extractProp(this.$el, "display-value");
                          e && (this.$data.__displayValue = e);
                        },
                        "@input.stop"(e) {
                          this.$data.__isTyping &&
                            (this.$data.__open(), this.$dispatch("change"));
                        },
                        "@blur"() {
                          this.$data.__stopTyping(!1);
                        },
                        "@keydown"(e) {
                          queueMicrotask(() =>
                            this.$data.__context.activateByKeyEvent(
                              e,
                              !1,
                              () => this.$data.__isOpen,
                              () => this.$data.__open(),
                              (e) => (this.$data.__isTyping = e)
                            )
                          );
                        },
                        "@keydown.enter.prevent.stop"() {
                          this.$data.__selectActive(),
                            this.$data.__stopTyping(),
                            this.$data.__isMultiple ||
                              (this.$data.__close(), this.$data.__resetInput());
                        },
                        "@keydown.escape.prevent"(e) {
                          this.$data.__static || e.stopPropagation(),
                            this.$data.__stopTyping(),
                            this.$data.__close(),
                            this.$data.__resetInput();
                        },
                        "@keydown.tab"() {
                          this.$data.__stopTyping(),
                            this.$data.__isOpen && this.$data.__close(),
                            this.$data.__resetInput();
                        },
                        "@keydown.backspace"(e) {
                          if (this.$data.__isMultiple) return;
                          if (!this.$data.__nullable) return;
                          let t = e.target;
                          requestAnimationFrame(() => {
                            if ("" === t.value) {
                              this.$data.__value = null;
                              let e = this.$refs.__options;
                              e && (e.scrollTop = 0),
                                this.$data.__context.deactivate();
                            }
                          });
                        },
                      });
                    })(i, e)
                  : "button" === r.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "x-ref": "__button",
                        ":id"() {
                          return this.$id("alpine-combobox-button");
                        },
                        "aria-haspopup": "true",
                        async ":aria-controls"() {
                          return await o(
                            () =>
                              this.$refs.__options && this.$refs.__options.id
                          );
                        },
                        ":aria-labelledby"() {
                          return this.$refs.__label
                            ? [this.$refs.__label.id, this.$el.id].join(" ")
                            : null;
                        },
                        ":aria-expanded"() {
                          return this.$data.__isDisabled
                            ? null
                            : this.$data.__isOpen;
                        },
                        ":disabled"() {
                          return this.$data.__isDisabled;
                        },
                        tabindex: "-1",
                        "x-init"() {
                          "button" !== this.$el.tagName.toLowerCase() ||
                            this.$el.hasAttribute("type") ||
                            (this.$el.type = "button");
                        },
                        "@click"(e) {
                          this.$data.__isDisabled ||
                            (this.$data.__isOpen
                              ? (this.$data.__close(),
                                this.$data.__resetInput())
                              : (e.preventDefault(), this.$data.__open()),
                            this.$nextTick(() =>
                              this.$refs.__input.focus({ preventScroll: !0 })
                            ));
                        },
                      });
                    })(i, e)
                  : "label" === r.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "x-ref": "__label",
                        ":id"() {
                          return this.$id("alpine-combobox-label");
                        },
                        "@click"() {
                          this.$refs.__input.focus({ preventScroll: !0 });
                        },
                      });
                    })(i, e)
                  : "options" === r.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "x-ref": "__options",
                        ":id"() {
                          return this.$id("alpine-combobox-options");
                        },
                        role: "listbox",
                        ":aria-labelledby"() {
                          return this.$refs.__label
                            ? this.$refs.__label.id
                            : this.$refs.__button
                            ? this.$refs.__button.id
                            : null;
                        },
                        "x-init"() {
                          (this.$data.__isStatic = t.bound(
                            this.$el,
                            "static",
                            !1
                          )),
                            t.bound(this.$el, "hold") &&
                              (this.$data.__hold = !0);
                        },
                        "x-show"() {
                          return !!this.$data.__isStatic || this.$data.__isOpen;
                        },
                      });
                    })(i, e)
                  : "option" === r.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "x-id": () => ["alpine-combobox-option"],
                        ":id"() {
                          return this.$id("alpine-combobox-option");
                        },
                        role: "option",
                        ":tabindex"() {
                          return this.$comboboxOption.isDisabled
                            ? void 0
                            : "-1";
                        },
                        "x-effect"() {
                          this.$comboboxOption.isActive
                            ? e.setAttribute("aria-selected", !0)
                            : e.removeAttribute("aria-selected");
                        },
                        ":aria-disabled"() {
                          return this.$comboboxOption.isDisabled;
                        },
                        "x-data": () => ({
                          init() {
                            let e = (this.$el.__optionKey = (Math.random() + 1)
                                .toString(36)
                                .substring(7)),
                              i = t.extractProp(this.$el, "value"),
                              n = t.extractProp(this.$el, "disabled", !1, !1);
                            this.__context.registerItem(e, this.$el, i, n);
                          },
                          destroy() {
                            this.__context.unregisterItem(this.$el.__optionKey);
                          },
                        }),
                        "@click"() {
                          this.$comboboxOption.isDisabled ||
                            (this.__selectOption(this.$el),
                            this.__isMultiple ||
                              (this.__close(), this.__resetInput()),
                            this.$nextTick(() =>
                              this.$refs.__input.focus({ preventScroll: !0 })
                            ));
                        },
                        "@mouseenter"(e) {
                          this.__context.activateEl(this.$el);
                        },
                        "@mousemove"(e) {
                          this.__context.isActiveEl(this.$el) ||
                            this.__context.activateEl(this.$el);
                        },
                        "@mouseleave"(e) {
                          this.__hold || this.__context.deactivate();
                        },
                      });
                    })(i, e)
                  : (function (e, i) {
                      i.bind(e, {
                        "x-id": () => [
                          "alpine-combobox-button",
                          "alpine-combobox-options",
                          "alpine-combobox-label",
                        ],
                        "x-modelable": "__value",
                        "x-data": () => ({
                          __ready: !1,
                          __value: null,
                          __isOpen: !1,
                          __context: void 0,
                          __isMultiple: void 0,
                          __isStatic: !1,
                          __isDisabled: void 0,
                          __displayValue: void 0,
                          __compareBy: null,
                          __inputName: null,
                          __isTyping: !1,
                          __hold: !1,
                          init() {
                            (this.__isMultiple = i.extractProp(
                              e,
                              "multiple",
                              !1
                            )),
                              (this.__isDisabled = i.extractProp(
                                e,
                                "disabled",
                                !1
                              )),
                              (this.__inputName = i.extractProp(
                                e,
                                "name",
                                null
                              )),
                              (this.__nullable = i.extractProp(
                                e,
                                "nullable",
                                !1
                              )),
                              (this.__compareBy = i.extractProp(e, "by")),
                              (this.__context = t(
                                i,
                                this.__isMultiple,
                                "vertical",
                                () => this.__activateSelectedOrFirst()
                              ));
                            let r = i.extractProp(
                              e,
                              "default-value",
                              this.__isMultiple ? [] : null
                            );
                            (this.__value = r),
                              queueMicrotask(() => {
                                i.effect(() => {
                                  this.__inputName &&
                                    n(
                                      i,
                                      this.$el,
                                      this.__inputName,
                                      this.__value
                                    );
                                });
                              });
                          },
                          __startTyping() {
                            this.__isTyping = !0;
                          },
                          __stopTyping() {
                            this.__isTyping = !1;
                          },
                          __resetInput() {
                            let e = this.$refs.__input;
                            if (!e) return;
                            let t = this.__getCurrentValue();
                            e.value = t;
                          },
                          __getCurrentValue() {
                            return this.$refs.__input && this.__value
                              ? this.__displayValue
                                ? this.__displayValue(this.__value)
                                : "string" == typeof this.__value
                                ? this.__value
                                : ""
                              : "";
                          },
                          __open() {
                            if (this.__isOpen) return;
                            this.__isOpen = !0;
                            let e = this.$refs.__input;
                            if (e) {
                              let t = e.value,
                                {
                                  selectionStart: i,
                                  selectionEnd: n,
                                  selectionDirection: r,
                                } = e;
                              (e.value = ""),
                                e.dispatchEvent(new Event("change")),
                                (e.value = t),
                                null !== r
                                  ? e.setSelectionRange(i, n, r)
                                  : e.setSelectionRange(i, n);
                            }
                            var t;
                            (t = () => {
                              this.$refs.__input.focus({ preventScroll: !0 }),
                                this.__activateSelectedOrFirst();
                            }),
                              requestAnimationFrame(() =>
                                requestAnimationFrame(t)
                              );
                          },
                          __close() {
                            (this.__isOpen = !1), this.__context.deactivate();
                          },
                          __activateSelectedOrFirst(e = !0) {
                            if (!this.__isOpen) return;
                            if (
                              this.__context.hasActive() &&
                              this.__context.wasActivatedByKeyPress()
                            )
                              return;
                            let t;
                            if (this.__isMultiple) {
                              let e = this.__context.getItemsByValues(
                                this.__value
                              );
                              t = e.length ? e[0].value : null;
                            } else t = this.__value;
                            let i = null;
                            e && t && (i = this.__context.getItemByValue(t)),
                              i
                                ? this.__context.activateAndScrollToKey(i.key)
                                : this.__context.activateAndScrollToKey(
                                    this.__context.firstKey()
                                  );
                          },
                          __selectActive() {
                            let e = this.__context.getActiveItem();
                            e && this.__toggleSelected(e.value);
                          },
                          __selectOption(e) {
                            let t = this.__context.getItemByEl(e);
                            t && this.__toggleSelected(t.value);
                          },
                          __isSelected(e) {
                            let t = this.__context.getItemByEl(e);
                            return (
                              !!t && !!t.value && this.__hasSelected(t.value)
                            );
                          },
                          __toggleSelected(e) {
                            if (!this.__isMultiple)
                              return void (this.__value = e);
                            let t = this.__value.findIndex((t) =>
                              this.__compare(t, e)
                            );
                            -1 === t
                              ? this.__value.push(e)
                              : this.__value.splice(t, 1);
                          },
                          __hasSelected(e) {
                            return this.__isMultiple
                              ? this.__value.some((t) => this.__compare(t, e))
                              : this.__compare(this.__value, e);
                          },
                          __compare(e, t) {
                            let n = this.__compareBy;
                            if (
                              (n || (n = (e, t) => i.raw(e) === i.raw(t)),
                              "string" == typeof n)
                            ) {
                              let e = n;
                              n = (t, i) => t[e] === i[e];
                            }
                            return n(e, t);
                          },
                        }),
                        "@mousedown.window"(e) {
                          this.$refs.__input.contains(e.target) ||
                            this.$refs.__button.contains(e.target) ||
                            this.$refs.__options.contains(e.target) ||
                            (this.__close(), this.__resetInput());
                        },
                      });
                    })(i, e);
              })
              .before("bind"),
              e.magic("combobox", (t) => {
                let i = e.$data(t);
                return {
                  get value() {
                    return i.__value;
                  },
                  get isOpen() {
                    return i.__isOpen;
                  },
                  get isDisabled() {
                    return i.__isDisabled;
                  },
                  get activeOption() {
                    let e = i.__context?.getActiveItem();
                    return e && e.value;
                  },
                  get activeIndex() {
                    let t = i.__context?.getActiveItem();
                    return t
                      ? Object.values(e.raw(i.__context.items)).findIndex(
                          (i) => e.raw(t) == e.raw(i)
                        )
                      : null;
                  },
                };
              }),
              e.magic("comboboxOption", (t) => {
                let i = e.$data(t),
                  n = e.findClosest(t, (e) => e.__optionKey);
                if (!n) throw "No x-combobox:option directive found...";
                return {
                  get isActive() {
                    return i.__context.isActiveKey(n.__optionKey);
                  },
                  get isSelected() {
                    return i.__isSelected(n);
                  },
                  get isDisabled() {
                    return i.__context.isDisabled(n.__optionKey);
                  },
                };
              });
          })(e),
            (function (e) {
              e.directive("dialog", (t, i) => {
                "overlay" === i.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "x-init"() {
                          void 0 === this.$data.__isOpen &&
                            console.warn(
                              '"x-dialog:overlay" is missing a parent element with "x-dialog".'
                            );
                        },
                        "x-show"() {
                          return this.__isOpen;
                        },
                        "@click.prevent.stop"() {
                          this.$data.__close();
                        },
                      });
                    })(t, e)
                  : "panel" === i.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "@click.outside"() {
                          this.$data.__close();
                        },
                        "x-show"() {
                          return this.$data.__isOpen;
                        },
                      });
                    })(t, e)
                  : "title" === i.value
                  ? (function (e, t) {
                      t.bind(e, {
                        "x-init"() {
                          void 0 === this.$data.__isOpen &&
                            console.warn(
                              '"x-dialog:title" is missing a parent element with "x-dialog".'
                            );
                        },
                        ":id"() {
                          return this.$id("alpine-dialog-title");
                        },
                      });
                    })(t, e)
                  : "description" === i.value
                  ? (function (e, t) {
                      t.bind(e, {
                        ":id"() {
                          return this.$id("alpine-dialog-description");
                        },
                      });
                    })(t, e)
                  : (function (e, t) {
                      t.bind(e, {
                        "x-data": () => ({
                          init() {
                            void 0 !== t.bound(e, "open") &&
                              t.effect(() => {
                                this.__isOpenState = t.bound(e, "open");
                              }),
                              void 0 !== t.bound(e, "initial-focus") &&
                                this.$watch("__isOpenState", () => {
                                  this.__isOpenState &&
                                    setTimeout(() => {
                                      t.bound(e, "initial-focus").focus();
                                    }, 0);
                                });
                          },
                          __isOpenState: !1,
                          __close() {
                            t.bound(e, "open")
                              ? this.$dispatch("close")
                              : (this.__isOpenState = !1);
                          },
                          get __isOpen() {
                            return t.bound(e, "static", this.__isOpenState);
                          },
                        }),
                        "x-modelable": "__isOpenState",
                        "x-id": () => [
                          "alpine-dialog-title",
                          "alpine-dialog-description",
                        ],
                        "x-show"() {
                          return this.__isOpen;
                        },
                        "x-trap.inert.noscroll"() {
                          return this.__isOpen;
                        },
                        "@keydown.escape"() {
                          this.__close();
                        },
                        ":aria-labelledby"() {
                          return this.$id("alpine-dialog-title");
                        },
                        ":aria-describedby"() {
                          return this.$id("alpine-dialog-description");
                        },
                        role: "dialog",
                        "aria-modal": "true",
                      });
                    })(t, e);
              }),
                e.magic("dialog", (t) => {
                  let i = e.$data(t);
                  return {
                    get open() {
                      return i.__isOpen;
                    },
                    get isOpen() {
                      return i.__isOpen;
                    },
                    close() {
                      i.__close();
                    },
                  };
                });
            })(e),
            (function (e) {
              e
                .directive("disclosure", (t, i) => {
                  i.value
                    ? "panel" === i.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-show"() {
                              return this.$data.__isOpen;
                            },
                            ":id"() {
                              return this.$data.$id("alpine-disclosure-panel");
                            },
                          });
                        })(t, e)
                      : "button" === i.value &&
                        (function (e, t) {
                          t.bind(e, {
                            "x-init"() {
                              "button" !== this.$el.tagName.toLowerCase() ||
                                this.$el.hasAttribute("type") ||
                                (this.$el.type = "button");
                            },
                            "@click"() {
                              this.$data.__isOpen = !this.$data.__isOpen;
                            },
                            ":aria-expanded"() {
                              return this.$data.__isOpen;
                            },
                            ":aria-controls"() {
                              return this.$data.$id("alpine-disclosure-panel");
                            },
                            "@keydown.space.prevent.stop"() {
                              this.$data.__toggle();
                            },
                            "@keydown.enter.prevent.stop"() {
                              this.$data.__toggle();
                            },
                            "@keyup.space.prevent"() {},
                          });
                        })(t, e)
                    : (function (e, t) {
                        t.bind(e, {
                          "x-modelable": "__isOpen",
                          "x-data": () => ({
                            init() {
                              queueMicrotask(() => {
                                let e = Boolean(
                                  t.bound(this.$el, "default-open", !1)
                                );
                                e && (this.__isOpen = e);
                              });
                            },
                            __isOpen: !1,
                            __close() {
                              this.__isOpen = !1;
                            },
                            __toggle() {
                              this.__isOpen = !this.__isOpen;
                            },
                          }),
                          "x-id": () => ["alpine-disclosure-panel"],
                        });
                      })(t, e);
                })
                .before("bind"),
                e.magic("disclosure", (t) => {
                  let i = e.$data(t);
                  return {
                    get isOpen() {
                      return i.__isOpen;
                    },
                    close() {
                      i.__close();
                    },
                  };
                });
            })(e),
            (function (e) {
              e
                .directive("listbox", (i, r) => {
                  r.value
                    ? "label" === r.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-ref": "__label",
                            ":id"() {
                              return this.$id("alpine-listbox-label");
                            },
                            "@click"() {
                              this.$refs.__button.focus({ preventScroll: !0 });
                            },
                          });
                        })(i, e)
                      : "button" === r.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-ref": "__button",
                            ":id"() {
                              return this.$id("alpine-listbox-button");
                            },
                            "aria-haspopup": "true",
                            ":aria-labelledby"() {
                              return this.$id("alpine-listbox-label");
                            },
                            ":aria-expanded"() {
                              return this.$data.__isOpen;
                            },
                            ":aria-controls"() {
                              return (
                                this.$data.__isOpen &&
                                this.$id("alpine-listbox-options")
                              );
                            },
                            "x-init"() {
                              "button" !== this.$el.tagName.toLowerCase() ||
                                this.$el.hasAttribute("type") ||
                                (this.$el.type = "button");
                            },
                            "@click"() {
                              this.$data.__open();
                            },
                            "@keydown"(e) {
                              [
                                "ArrowDown",
                                "ArrowUp",
                                "ArrowLeft",
                                "ArrowRight",
                              ].includes(e.key) &&
                                (e.stopPropagation(),
                                e.preventDefault(),
                                this.$data.__open());
                            },
                            "@keydown.space.stop.prevent"() {
                              this.$data.__open();
                            },
                            "@keydown.enter.stop.prevent"() {
                              this.$data.__open();
                            },
                          });
                        })(i, e)
                      : "options" === r.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-ref": "__options",
                            ":id"() {
                              return this.$id("alpine-listbox-options");
                            },
                            role: "listbox",
                            tabindex: "0",
                            ":aria-orientation"() {
                              return this.$data.__orientation;
                            },
                            ":aria-labelledby"() {
                              return this.$id("alpine-listbox-button");
                            },
                            ":aria-activedescendant"() {
                              if (!this.$data.__context.hasActive()) return;
                              let e = this.$data.__context.getActiveItem();
                              return e ? e.el.id : null;
                            },
                            "x-init"() {
                              (this.$data.__isStatic = t.extractProp(
                                this.$el,
                                "static",
                                !1
                              )),
                                t.bound(this.$el, "hold") &&
                                  (this.$data.__hold = !0);
                            },
                            "x-show"() {
                              return (
                                !!this.$data.__isStatic || this.$data.__isOpen
                              );
                            },
                            "x-trap"() {
                              return this.$data.__isOpen;
                            },
                            "@click.outside"() {
                              this.$data.__close();
                            },
                            "@keydown.escape.stop.prevent"() {
                              this.$data.__close();
                            },
                            "@focus"() {
                              this.$data.__activateSelectedOrFirst();
                            },
                            "@keydown"(e) {
                              queueMicrotask(() =>
                                this.$data.__context.activateByKeyEvent(
                                  e,
                                  !0,
                                  () => this.$data.__isOpen,
                                  () => this.$data.__open(),
                                  () => {}
                                )
                              );
                            },
                            "@keydown.enter.stop.prevent"() {
                              this.$data.__selectActive(),
                                this.$data.__isMultiple || this.$data.__close();
                            },
                            "@keydown.space.stop.prevent"() {
                              this.$data.__selectActive(),
                                this.$data.__isMultiple || this.$data.__close();
                            },
                          });
                        })(i, e)
                      : "option" === r.value &&
                        (function (e, t) {
                          t.bind(e, () => ({
                            "x-id": () => ["alpine-listbox-option"],
                            ":id"() {
                              return this.$id("alpine-listbox-option");
                            },
                            role: "option",
                            ":tabindex"() {
                              return !this.$listboxOption.isDisabled && "-1";
                            },
                            ":aria-selected"() {
                              return this.$listboxOption.isSelected;
                            },
                            "x-data": () => ({
                              init() {
                                let i = (e.__optionKey = (Math.random() + 1)
                                    .toString(36)
                                    .substring(7)),
                                  n = t.extractProp(e, "value"),
                                  r = t.extractProp(e, "disabled", !1, !1);
                                this.$data.__context.registerItem(i, e, n, r);
                              },
                              destroy() {
                                this.$data.__context.unregisterItem(
                                  this.$el.__optionKey
                                );
                              },
                            }),
                            "@click"() {
                              this.$listboxOption.isDisabled ||
                                (this.$data.__selectOption(e),
                                this.$data.__isMultiple ||
                                  this.$data.__close());
                            },
                            "@mouseenter"() {
                              this.$data.__context.activateEl(e);
                            },
                            "@mouseleave"() {
                              this.$data.__hold ||
                                this.$data.__context.deactivate();
                            },
                          }));
                        })(i, e)
                    : (function (e, i) {
                        i.bind(e, {
                          "x-id": () => [
                            "alpine-listbox-button",
                            "alpine-listbox-options",
                            "alpine-listbox-label",
                          ],
                          "x-modelable": "__value",
                          "x-data": () => ({
                            __ready: !1,
                            __value: null,
                            __isOpen: !1,
                            __context: void 0,
                            __isMultiple: void 0,
                            __isStatic: !1,
                            __isDisabled: void 0,
                            __compareBy: null,
                            __inputName: null,
                            __orientation: "vertical",
                            __hold: !1,
                            init() {
                              (this.__isMultiple = i.extractProp(
                                e,
                                "multiple",
                                !1
                              )),
                                (this.__isDisabled = i.extractProp(
                                  e,
                                  "disabled",
                                  !1
                                )),
                                (this.__inputName = i.extractProp(
                                  e,
                                  "name",
                                  null
                                )),
                                (this.__compareBy = i.extractProp(e, "by")),
                                (this.__orientation = i.extractProp(
                                  e,
                                  "horizontal",
                                  !1
                                )
                                  ? "horizontal"
                                  : "vertical"),
                                (this.__context = t(
                                  i,
                                  this.__isMultiple,
                                  this.__orientation,
                                  () => this.$data.__activateSelectedOrFirst()
                                ));
                              let r = i.extractProp(
                                e,
                                "default-value",
                                this.__isMultiple ? [] : null
                              );
                              (this.__value = r),
                                queueMicrotask(() => {
                                  i.effect(() => {
                                    this.__inputName &&
                                      n(
                                        i,
                                        this.$el,
                                        this.__inputName,
                                        this.__value
                                      );
                                  }),
                                    i.effect(() => {
                                      this.__resetInput();
                                    });
                                });
                            },
                            __resetInput() {
                              let e = this.$refs.__input;
                              if (!e) return;
                              let t = this.$data.__getCurrentValue();
                              e.value = t;
                            },
                            __getCurrentValue() {
                              return this.$refs.__input && this.__value
                                ? this.$data.__displayValue &&
                                  void 0 !== this.__value
                                  ? this.$data.__displayValue(this.__value)
                                  : "string" == typeof this.__value
                                  ? this.__value
                                  : ""
                                : "";
                            },
                            __open() {
                              var e;
                              this.__isOpen ||
                                ((this.__isOpen = !0),
                                this.__activateSelectedOrFirst(),
                                (e = () =>
                                  this.$refs.__options.focus({
                                    preventScroll: !0,
                                  })),
                                requestAnimationFrame(() =>
                                  requestAnimationFrame(e)
                                ));
                            },
                            __close() {
                              (this.__isOpen = !1),
                                this.__context.deactivate(),
                                this.$nextTick(() =>
                                  this.$refs.__button.focus({
                                    preventScroll: !0,
                                  })
                                );
                            },
                            __activateSelectedOrFirst(e = !0) {
                              if (!this.__isOpen) return;
                              if (this.__context.activeKey)
                                return void this.__context.activateAndScrollToKey(
                                  this.__context.activeKey
                                );
                              let t;
                              if (
                                ((t = this.__isMultiple
                                  ? this.__value.find(
                                      (e) => !!this.__context.getItemByValue(e)
                                    )
                                  : this.__value),
                                e && t)
                              ) {
                                let e = this.__context.getItemByValue(t);
                                e &&
                                  this.__context.activateAndScrollToKey(e.key);
                              } else
                                this.__context.activateAndScrollToKey(
                                  this.__context.firstKey()
                                );
                            },
                            __selectActive() {
                              let e = this.$data.__context.getActiveItem();
                              e && this.__toggleSelected(e.value);
                            },
                            __selectOption(e) {
                              let t = this.__context.getItemByEl(e);
                              t && this.__toggleSelected(t.value);
                            },
                            __isSelected(e) {
                              let t = this.__context.getItemByEl(e);
                              return (
                                !!t && !!t.value && this.__hasSelected(t.value)
                              );
                            },
                            __toggleSelected(e) {
                              if (!this.__isMultiple)
                                return void (this.__value = e);
                              let t = this.__value.findIndex((t) =>
                                this.__compare(t, e)
                              );
                              -1 === t
                                ? this.__value.push(e)
                                : this.__value.splice(t, 1);
                            },
                            __hasSelected(e) {
                              return this.__isMultiple
                                ? this.__value.some((t) => this.__compare(t, e))
                                : this.__compare(this.__value, e);
                            },
                            __compare(e, t) {
                              let n = this.__compareBy;
                              if (
                                (n || (n = (e, t) => i.raw(e) === i.raw(t)),
                                "string" == typeof n)
                              ) {
                                let e = n;
                                n = (t, i) => t[e] === i[e];
                              }
                              return n(e, t);
                            },
                          }),
                        });
                      })(i, e);
                })
                .before("bind"),
                e.magic("listbox", (t) => {
                  let i = e.$data(t);
                  return {
                    get selected() {
                      return i.__value;
                    },
                    get active() {
                      let e = i.__context.getActiveItem();
                      return e && e.value;
                    },
                    get value() {
                      return i.__value;
                    },
                    get isOpen() {
                      return i.__isOpen;
                    },
                    get isDisabled() {
                      return i.__isDisabled;
                    },
                    get activeOption() {
                      let e = i.__context.getActiveItem();
                      return e && e.value;
                    },
                    get activeIndex() {
                      let e = i.__context.getActiveItem();
                      return e && e.key;
                    },
                  };
                }),
                e.magic("listboxOption", (t) => {
                  let i = e.$data(t),
                    n = e.findClosest(t, (e) => e.__optionKey);
                  if (!n) throw "No x-combobox:option directive found...";
                  return {
                    get isActive() {
                      return i.__context.isActiveKey(n.__optionKey);
                    },
                    get isSelected() {
                      return i.__isSelected(n);
                    },
                    get isDisabled() {
                      return i.__context.isDisabled(n.__optionKey);
                    },
                  };
                });
            })(e),
            (function (e) {
              e
                .directive("menu", (t, i) => {
                  i.value
                    ? "items" === i.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-ref": "__items",
                            "aria-orientation": "vertical",
                            role: "menu",
                            ":id"() {
                              return this.$id("alpine-menu-items");
                            },
                            ":aria-labelledby"() {
                              return this.$id("alpine-menu-button");
                            },
                            ":aria-activedescendant"() {
                              return (
                                this.$data.__activeEl &&
                                this.$data.__activeEl.id
                              );
                            },
                            "x-show"() {
                              return this.$data.__isOpen;
                            },
                            tabindex: "0",
                            "@click.outside"() {
                              this.$data.__close();
                            },
                            "@keydown"(e) {
                              a.search(t, this.$refs.__items, e.key, (e) =>
                                e.__activate()
                              );
                            },
                            "@keydown.down.stop.prevent"() {
                              this.$data.__activeEl
                                ? a.next(t, this.$data.__activeEl, (e) =>
                                    e.__activate()
                                  )
                                : a.first(t, this.$refs.__items, (e) =>
                                    e.__activate()
                                  );
                            },
                            "@keydown.up.stop.prevent"() {
                              this.$data.__activeEl
                                ? a.previous(t, this.$data.__activeEl, (e) =>
                                    e.__activate()
                                  )
                                : a.last(t, this.$refs.__items, (e) =>
                                    e.__activate()
                                  );
                            },
                            "@keydown.home.stop.prevent"() {
                              a.first(t, this.$refs.__items, (e) =>
                                e.__activate()
                              );
                            },
                            "@keydown.end.stop.prevent"() {
                              a.last(t, this.$refs.__items, (e) =>
                                e.__activate()
                              );
                            },
                            "@keydown.page-up.stop.prevent"() {
                              a.first(t, this.$refs.__items, (e) =>
                                e.__activate()
                              );
                            },
                            "@keydown.page-down.stop.prevent"() {
                              a.last(t, this.$refs.__items, (e) =>
                                e.__activate()
                              );
                            },
                            "@keydown.escape.stop.prevent"() {
                              this.$data.__close();
                            },
                            "@keydown.space.stop.prevent"() {
                              this.$data.__activeEl &&
                                this.$data.__activeEl.click();
                            },
                            "@keydown.enter.stop.prevent"() {
                              this.$data.__activeEl &&
                                this.$data.__activeEl.click();
                            },
                            "@keyup.space.prevent"() {},
                          });
                        })(t, e)
                      : "item" === i.value
                      ? (function (e, t) {
                          t.bind(e, () => ({
                            "x-data"() {
                              return {
                                __itemEl: this.$el,
                                init() {
                                  let e = t.raw(this.$data.__itemEls),
                                    i = !1;
                                  for (let t = 0; t < e.length; t++)
                                    if (
                                      e[t].compareDocumentPosition(this.$el) &
                                      Node.DOCUMENT_POSITION_PRECEDING
                                    ) {
                                      e.splice(t, 0, this.$el), (i = !0);
                                      break;
                                    }
                                  i || e.push(this.$el),
                                    (this.$el.__activate = () => {
                                      (this.$data.__activeEl = this.$el),
                                        this.$el.scrollIntoView({
                                          block: "nearest",
                                        });
                                    }),
                                    (this.$el.__deactivate = () => {
                                      this.$data.__activeEl = null;
                                    }),
                                    (this.$el.__isDisabled = t.reactive({
                                      value: !1,
                                    })),
                                    queueMicrotask(() => {
                                      this.$el.__isDisabled.value = t.bound(
                                        this.$el,
                                        "disabled",
                                        !1
                                      );
                                    });
                                },
                                destroy() {
                                  let e = this.$data.__itemEls;
                                  e.splice(e.indexOf(this.$el), 1);
                                },
                              };
                            },
                            "x-id": () => ["alpine-menu-item"],
                            ":id"() {
                              return this.$id("alpine-menu-item");
                            },
                            ":tabindex"() {
                              return !this.$el.__isDisabled.value && "-1";
                            },
                            role: "menuitem",
                            "@mousemove"() {
                              this.$el.__isDisabled.value ||
                                this.$menuItem.isActive ||
                                this.$el.__activate();
                            },
                            "@mouseleave"() {
                              this.$el.__isDisabled.value ||
                                !this.$menuItem.isActive ||
                                this.$el.__deactivate();
                            },
                          }));
                        })(t, e)
                      : "button" === i.value &&
                        (function (e, t) {
                          t.bind(e, {
                            "x-ref": "__button",
                            "aria-haspopup": "true",
                            ":aria-labelledby"() {
                              return this.$id("alpine-menu-label");
                            },
                            ":id"() {
                              return this.$id("alpine-menu-button");
                            },
                            ":aria-expanded"() {
                              return this.$data.__isOpen;
                            },
                            ":aria-controls"() {
                              return (
                                this.$data.__isOpen &&
                                this.$id("alpine-menu-items")
                              );
                            },
                            "x-init"() {
                              "button" !== this.$el.tagName.toLowerCase() ||
                                this.$el.hasAttribute("type") ||
                                (this.$el.type = "button");
                            },
                            "@click"() {
                              this.$data.__open();
                            },
                            "@keydown.down.stop.prevent"() {
                              this.$data.__open();
                            },
                            "@keydown.up.stop.prevent"() {
                              this.$data.__open(a.Alpine, last);
                            },
                            "@keydown.space.stop.prevent"() {
                              this.$data.__open();
                            },
                            "@keydown.enter.stop.prevent"() {
                              this.$data.__open();
                            },
                          });
                        })(t, e)
                    : (function (e, t) {
                        t.bind(e, {
                          "x-id": () => [
                            "alpine-menu-button",
                            "alpine-menu-items",
                          ],
                          "x-modelable": "__isOpen",
                          "x-data": () => ({
                            __itemEls: [],
                            __activeEl: null,
                            __isOpen: !1,
                            __open() {
                              var e;
                              (this.__isOpen = !0),
                                (e = () =>
                                  this.$refs.__items.focus({
                                    preventScroll: !0,
                                  })),
                                requestAnimationFrame(() =>
                                  requestAnimationFrame(e)
                                );
                            },
                            __close(e = !0) {
                              (this.__isOpen = !1),
                                e &&
                                  this.$nextTick(() =>
                                    this.$refs.__button.focus({
                                      preventScroll: !0,
                                    })
                                  );
                            },
                            __contains: (e, i) =>
                              !!t.findClosest(i, (t) => t.isSameNode(e)),
                          }),
                          "@focusin.window"() {
                            this.$data.__contains(
                              this.$el,
                              document.activeElement
                            ) || this.$data.__close(!1);
                          },
                        });
                      })(t, e);
                })
                .before("bind"),
                e.magic("menuItem", (t) => {
                  let i = e.$data(t);
                  return {
                    get isActive() {
                      return i.__activeEl == i.__itemEl;
                    },
                    get isDisabled() {
                      return t.__isDisabled.value;
                    },
                  };
                });
            })(e),
            (function (e) {
              e
                .directive("switch", (t, i) => {
                  "group" === i.value
                    ? (function (e, t) {
                        t.bind(e, {
                          "x-id": () => [
                            "alpine-switch-label",
                            "alpine-switch-description",
                          ],
                          "x-data": () => ({
                            __hasLabel: !1,
                            __hasDescription: !1,
                            __switchEl: void 0,
                          }),
                        });
                      })(t, e)
                    : "label" === i.value
                    ? (function (e, t) {
                        t.bind(e, {
                          "x-init"() {
                            this.$data.__hasLabel = !0;
                          },
                          ":id"() {
                            return this.$id("alpine-switch-label");
                          },
                          "@click"() {
                            this.$data.__switchEl.click(),
                              this.$data.__switchEl.focus({
                                preventScroll: !0,
                              });
                          },
                        });
                      })(t, e)
                    : "description" === i.value
                    ? (function (e, t) {
                        t.bind(e, {
                          "x-init"() {
                            this.$data.__hasDescription = !0;
                          },
                          ":id"() {
                            return this.$id("alpine-switch-description");
                          },
                        });
                      })(t, e)
                    : (function (e, t) {
                        t.bind(e, {
                          "x-modelable": "__value",
                          "x-data": () => ({
                            init() {
                              queueMicrotask(() => {
                                (this.__value = t.bound(
                                  this.$el,
                                  "default-checked",
                                  !1
                                )),
                                  (this.__inputName = t.bound(
                                    this.$el,
                                    "name",
                                    !1
                                  )),
                                  (this.__inputValue = t.bound(
                                    this.$el,
                                    "value",
                                    "on"
                                  )),
                                  (this.__inputId =
                                    "alpine-switch-" + Date.now());
                              });
                            },
                            __value: void 0,
                            __inputName: void 0,
                            __inputValue: void 0,
                            __inputId: void 0,
                            __toggle() {
                              this.__value = !this.__value;
                            },
                          }),
                          "x-effect"() {
                            let e = this.__value;
                            if (!this.__inputName) return;
                            let t = this.$el.nextElementSibling;
                            if (
                              (t &&
                                String(t.id) === String(this.__inputId) &&
                                t.remove(),
                              e)
                            ) {
                              let e = document.createElement("input");
                              (e.type = "hidden"),
                                (e.value = this.__inputValue),
                                (e.name = this.__inputName),
                                (e.id = this.__inputId),
                                this.$el.after(e);
                            }
                          },
                          "x-init"() {
                            "button" !== this.$el.tagName.toLowerCase() ||
                              this.$el.hasAttribute("type") ||
                              (this.$el.type = "button"),
                              (this.$data.__switchEl = this.$el);
                          },
                          role: "switch",
                          tabindex: "0",
                          ":aria-checked"() {
                            return !!this.__value;
                          },
                          ":aria-labelledby"() {
                            return (
                              this.$data.__hasLabel &&
                              this.$id("alpine-switch-label")
                            );
                          },
                          ":aria-describedby"() {
                            return (
                              this.$data.__hasDescription &&
                              this.$id("alpine-switch-description")
                            );
                          },
                          "@click.prevent"() {
                            this.__toggle();
                          },
                          "@keyup"(e) {
                            "Tab" !== e.key && e.preventDefault(),
                              " " === e.key && this.__toggle();
                          },
                          "@keypress.prevent"() {},
                        });
                      })(t, e);
                })
                .before("bind"),
                e.magic("switch", (t) => {
                  let i = e.$data(t);
                  return {
                    get isChecked() {
                      return !0 === i.__value;
                    },
                  };
                });
            })(e),
            (function (e) {
              e.directive("popover", (t, i) => {
                i.value
                  ? "overlay" === i.value
                    ? (function (e, t) {
                        t.bind(e, {
                          "x-show"() {
                            return this.$data.__isOpen;
                          },
                        });
                      })(t, e)
                    : "button" === i.value
                    ? (function (e, t) {
                        t.bind(e, {
                          "x-ref": "button",
                          ":id"() {
                            return this.$id("alpine-popover-button");
                          },
                          ":aria-expanded"() {
                            return this.$data.__isOpen;
                          },
                          ":aria-controls"() {
                            return (
                              this.$data.__isOpen &&
                              this.$id("alpine-popover-panel")
                            );
                          },
                          "x-init"() {
                            "button" !== this.$el.tagName.toLowerCase() ||
                              this.$el.hasAttribute("type") ||
                              (this.$el.type = "button"),
                              (this.$data.__buttonEl = this.$el);
                          },
                          "@click"() {
                            this.$data.__toggle();
                          },
                          "@keydown.tab"(e) {
                            if (!e.shiftKey && this.$data.__isOpen) {
                              let t = this.$focus
                                .within(this.$data.__panelEl)
                                .getFirst();
                              t &&
                                (e.preventDefault(),
                                e.stopPropagation(),
                                this.$focus.focus(t));
                            }
                          },
                          "@keyup.tab"(e) {
                            if (this.$data.__isOpen) {
                              let t = this.$focus.previouslyFocused();
                              if (!t) return;
                              !this.$data.__buttonEl.contains(t) &&
                                !this.$data.__panelEl.contains(t) &&
                                t &&
                                this.$el.compareDocumentPosition(t) &
                                  Node.DOCUMENT_POSITION_FOLLOWING &&
                                (e.preventDefault(),
                                e.stopPropagation(),
                                this.$focus
                                  .within(this.$data.__panelEl)
                                  .last());
                            }
                          },
                          "@keydown.space.stop.prevent"() {
                            this.$data.__toggle();
                          },
                          "@keydown.enter.stop.prevent"() {
                            this.$data.__toggle();
                          },
                          "@keyup.space.stop.prevent"() {},
                        });
                      })(t, e)
                    : "panel" === i.value
                    ? (function (e, t) {
                        t.bind(e, {
                          "x-init"() {
                            (this.$data.__isStatic = t.bound(
                              this.$el,
                              "static",
                              !1
                            )),
                              (this.$data.__panelEl = this.$el);
                          },
                          "x-effect"() {
                            this.$data.__isOpen &&
                              t.bound(e, "focus") &&
                              this.$focus.first();
                          },
                          "x-ref": "panel",
                          ":id"() {
                            return this.$id("alpine-popover-panel");
                          },
                          "x-show"() {
                            return this.$data.__isOpen;
                          },
                          "@mousedown.window"(e) {
                            this.$data.__isOpen &&
                              (this.$data.__contains(
                                this.$data.__buttonEl,
                                e.target
                              ) ||
                                this.$data.__contains(this.$el, e.target) ||
                                this.$focus.focusable(e.target) ||
                                this.$data.__close());
                          },
                          "@keydown.tab"(i) {
                            if (i.shiftKey && this.$focus.isFirst(i.target))
                              i.preventDefault(),
                                i.stopPropagation(),
                                t.bound(e, "focus")
                                  ? this.$data.__close()
                                  : this.$data.__buttonEl.focus();
                            else if (
                              !i.shiftKey &&
                              this.$focus.isLast(i.target)
                            ) {
                              i.preventDefault(), i.stopPropagation();
                              let n = this.$focus.within(document).all(),
                                r = n.indexOf(this.$data.__buttonEl);
                              n
                                .splice(r + 1)
                                .filter((e) => !this.$el.contains(e))[0]
                                .focus(),
                                t.bound(e, "focus") && this.$data.__close(!1);
                            }
                          },
                        });
                      })(t, e)
                    : "group" === i.value &&
                      (function (e, t) {
                        t.bind(e, {
                          "x-ref": "container",
                          "x-data"() {
                            return { __groupEl: this.$el };
                          },
                        });
                      })(t, e)
                  : (function (e, t) {
                      t.bind(e, {
                        "x-id": () => [
                          "alpine-popover-button",
                          "alpine-popover-panel",
                        ],
                        "x-modelable": "__isOpenState",
                        "x-data": () => ({
                          init() {
                            this.$data.__groupEl &&
                              this.$data.__groupEl.addEventListener(
                                "__close-others",
                                ({ detail: e }) => {
                                  e.el.isSameNode(this.$el) || this.__close(!1);
                                }
                              );
                          },
                          __buttonEl: void 0,
                          __panelEl: void 0,
                          __isStatic: !1,
                          get __isOpen() {
                            return !!this.__isStatic || this.__isOpenState;
                          },
                          __isOpenState: !1,
                          __open() {
                            (this.__isOpenState = !0),
                              this.$dispatch("__close-others", {
                                el: this.$el,
                              });
                          },
                          __toggle() {
                            this.__isOpenState ? this.__close() : this.__open();
                          },
                          __close(e) {
                            this.__isStatic ||
                              ((this.__isOpenState = !1),
                              !1 !== e &&
                                ((e = e || this.$data.__buttonEl),
                                document.activeElement.isSameNode(e) ||
                                  setTimeout(() => e.focus())));
                          },
                          __contains: (e, i) =>
                            !!t.findClosest(i, (t) => t.isSameNode(e)),
                        }),
                        "@keydown.escape.stop.prevent"() {
                          this.__close();
                        },
                        "@focusin.window"() {
                          this.$data.__groupEl
                            ? this.$data.__contains(
                                this.$data.__groupEl,
                                document.activeElement
                              ) || this.$data.__close(!1)
                            : this.$data.__contains(
                                this.$el,
                                document.activeElement
                              ) || this.$data.__close(!1);
                        },
                      });
                    })(t, e);
              }),
                e.magic("popover", (t) => {
                  let i = e.$data(t);
                  return {
                    get isOpen() {
                      return i.__isOpenState;
                    },
                    open() {
                      i.__open();
                    },
                    close() {
                      i.__close();
                    },
                  };
                });
            })(e),
            (function (e) {
              e
                .directive("radio", (t, i) => {
                  i.value
                    ? "option" === i.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-data": () => ({
                              init() {
                                queueMicrotask(() => {
                                  (this.__disabled = t.bound(
                                    e,
                                    "disabled",
                                    !1
                                  )),
                                    (this.__option = t.bound(e, "value")),
                                    this.$data.__addOption(
                                      this.__option,
                                      this.$el,
                                      this.__disabled
                                    );
                                });
                              },
                              __option: void 0,
                              __disabled: !1,
                              __hasLabel: !1,
                              __hasDescription: !1,
                            }),
                            "x-id": () => [
                              "alpine-radio-label",
                              "alpine-radio-description",
                            ],
                            role: "radio",
                            ":aria-checked"() {
                              return this.$radioOption.isChecked;
                            },
                            ":aria-disabled"() {
                              return this.$radioOption.isDisabled;
                            },
                            ":aria-labelledby"() {
                              return (
                                this.__hasLabel &&
                                this.$id("alpine-radio-label")
                              );
                            },
                            ":aria-describedby"() {
                              return (
                                this.__hasDescription &&
                                this.$id("alpine-radio-description")
                              );
                            },
                            ":tabindex"() {
                              return this.$radioOption.isDisabled
                                ? -1
                                : this.$radioOption.isChecked ||
                                  (!this.$data.__value &&
                                    this.$data.__isFirstOption(
                                      this.$data.__option
                                    ))
                                ? 0
                                : -1;
                            },
                            "@click"() {
                              this.$radioOption.isDisabled ||
                                (this.$data.__change(this.$data.__option),
                                this.$el.focus());
                            },
                            "@focus"() {
                              this.$radioOption.isDisabled ||
                                this.$data.__setActive(this.$data.__option);
                            },
                            "@blur"() {
                              this.$data.__active === this.$data.__option &&
                                this.$data.__setActive(void 0);
                            },
                            "@keydown.space.stop.prevent"() {
                              this.$data.__change(this.$data.__option);
                            },
                          });
                        })(t, e)
                      : "label" === i.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-init"() {
                              this.$data.__hasLabel = !0;
                            },
                            ":id"() {
                              return this.$id("alpine-radio-label");
                            },
                          });
                        })(t, e)
                      : "description" === i.value &&
                        (function (e, t) {
                          t.bind(e, {
                            "x-init"() {
                              this.$data.__hasDescription = !0;
                            },
                            ":id"() {
                              return this.$id("alpine-radio-description");
                            },
                          });
                        })(t, e)
                    : (function (e, t) {
                        t.bind(e, {
                          "x-modelable": "__value",
                          "x-data"() {
                            return {
                              init() {
                                queueMicrotask(() => {
                                  (this.__rootDisabled = t.bound(
                                    e,
                                    "disabled",
                                    !1
                                  )),
                                    (this.__value = t.bound(
                                      this.$el,
                                      "default-value",
                                      !1
                                    )),
                                    (this.__inputName = t.bound(
                                      this.$el,
                                      "name",
                                      !1
                                    )),
                                    (this.__inputId =
                                      "alpine-radio-" + Date.now());
                                }),
                                  this.$nextTick(() => {
                                    let e = document.createTreeWalker(
                                      this.$el,
                                      NodeFilter.SHOW_ELEMENT,
                                      {
                                        acceptNode: (e) =>
                                          "radio" === e.getAttribute("role")
                                            ? NodeFilter.FILTER_REJECT
                                            : e.hasAttribute("role")
                                            ? NodeFilter.FILTER_SKIP
                                            : NodeFilter.FILTER_ACCEPT,
                                      },
                                      !1
                                    );
                                    for (; e.nextNode(); )
                                      e.currentNode.setAttribute(
                                        "role",
                                        "none"
                                      );
                                  });
                              },
                              __value: void 0,
                              __active: void 0,
                              __rootEl: this.$el,
                              __optionValues: [],
                              __disabledOptions: new Set(),
                              __optionElsByValue: new Map(),
                              __hasLabel: !1,
                              __hasDescription: !1,
                              __rootDisabled: !1,
                              __inputName: void 0,
                              __inputId: void 0,
                              __change(e) {
                                this.__rootDisabled || (this.__value = e);
                              },
                              __addOption(e, i, n) {
                                let r = t.raw(this.__optionValues),
                                  o = r.map((e) =>
                                    this.__optionElsByValue.get(e)
                                  ),
                                  a = !1;
                                for (let t = 0; t < o.length; t++)
                                  if (
                                    o[t].compareDocumentPosition(i) &
                                    Node.DOCUMENT_POSITION_PRECEDING
                                  ) {
                                    r.splice(t, 0, e),
                                      this.__optionElsByValue.set(e, i),
                                      (a = !0);
                                    break;
                                  }
                                a ||
                                  (r.push(e),
                                  this.__optionElsByValue.set(e, i)),
                                  n && this.__disabledOptions.add(e);
                              },
                              __isFirstOption(e) {
                                return 0 === this.__optionValues.indexOf(e);
                              },
                              __setActive(e) {
                                this.__active = e;
                              },
                              __focusOptionNext() {
                                let e = this.__active,
                                  t = this.__optionValues.filter(
                                    (e) => !this.__disabledOptions.has(e)
                                  ),
                                  i = t[this.__optionValues.indexOf(e) + 1];
                                (i = i || t[0]),
                                  this.__optionElsByValue.get(i).focus(),
                                  this.__change(i);
                              },
                              __focusOptionPrev() {
                                let e = this.__active,
                                  t = this.__optionValues.filter(
                                    (e) => !this.__disabledOptions.has(e)
                                  ),
                                  i = t[t.indexOf(e) - 1];
                                (i = i || t.slice(-1)[0]),
                                  this.__optionElsByValue.get(i).focus(),
                                  this.__change(i);
                              },
                            };
                          },
                          "x-effect"() {
                            let e = this.__value;
                            if (!this.__inputName) return;
                            let t = this.$el.nextElementSibling;
                            if (
                              (t &&
                                String(t.id) === String(this.__inputId) &&
                                t.remove(),
                              e)
                            ) {
                              let t = document.createElement("input");
                              (t.type = "hidden"),
                                (t.value = e),
                                (t.name = this.__inputName),
                                (t.id = this.__inputId),
                                this.$el.after(t);
                            }
                          },
                          role: "radiogroup",
                          "x-id": () => [
                            "alpine-radio-label",
                            "alpine-radio-description",
                          ],
                          ":aria-labelledby"() {
                            return (
                              this.__hasLabel && this.$id("alpine-radio-label")
                            );
                          },
                          ":aria-describedby"() {
                            return (
                              this.__hasDescription &&
                              this.$id("alpine-radio-description")
                            );
                          },
                          "@keydown.up.prevent.stop"() {
                            this.__focusOptionPrev();
                          },
                          "@keydown.left.prevent.stop"() {
                            this.__focusOptionPrev();
                          },
                          "@keydown.down.prevent.stop"() {
                            this.__focusOptionNext();
                          },
                          "@keydown.right.prevent.stop"() {
                            this.__focusOptionNext();
                          },
                        });
                      })(t, e);
                })
                .before("bind"),
                e.magic("radioOption", (t) => {
                  let i = e.$data(t);
                  return {
                    get isActive() {
                      return i.__option === i.__active;
                    },
                    get isChecked() {
                      return i.__option === i.__value;
                    },
                    get isDisabled() {
                      let e = i.__disabled;
                      return !!i.__rootDisabled || e;
                    },
                  };
                });
            })(e),
            (function (e) {
              e
                .directive("tabs", (t, i) => {
                  i.value
                    ? "list" === i.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-init"() {
                              this.$data.__tabGroupEl = this.$el;
                            },
                          });
                        })(t, e)
                      : "tab" === i.value
                      ? (function (e, t) {
                          t.bind(e, {
                            "x-init"() {
                              "button" !== this.$el.tagName.toLowerCase() ||
                                this.$el.hasAttribute("type") ||
                                (this.$el.type = "button");
                            },
                            "x-data": () => ({
                              init() {
                                (this.__tabEl = this.$el),
                                  this.$data.__addTab(this.$el),
                                  (this.__tabEl.__disabled = t.bound(
                                    this.$el,
                                    "disabled",
                                    !1
                                  )),
                                  (this.__isDisabled = this.__tabEl.__disabled);
                              },
                              __tabEl: void 0,
                              __isDisabled: !1,
                            }),
                            "@click"() {
                              this.$el.__disabled ||
                                (this.$data.__selectTab(this.$el),
                                this.$el.focus());
                            },
                            "@keydown.enter.prevent.stop"() {
                              this.__selectTab(this.$el);
                            },
                            "@keydown.space.prevent.stop"() {
                              this.__selectTab(this.$el);
                            },
                            "@keydown.home.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .first();
                            },
                            "@keydown.page-up.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .first();
                            },
                            "@keydown.end.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .last();
                            },
                            "@keydown.page-down.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .last();
                            },
                            "@keydown.down.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .withWrapAround()
                                .next();
                            },
                            "@keydown.right.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .withWrapAround()
                                .next();
                            },
                            "@keydown.up.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .withWrapAround()
                                .prev();
                            },
                            "@keydown.left.prevent.stop"() {
                              this.$focus
                                .within(this.$data.__activeTabs())
                                .withWrapAround()
                                .prev();
                            },
                            ":tabindex"() {
                              return this.$tab.isSelected ? 0 : -1;
                            },
                            "@focus"() {
                              if (this.$data.__manualActivation)
                                this.$el.focus();
                              else {
                                if (this.$el.__disabled) return;
                                this.$data.__selectTab(this.$el),
                                  this.$el.focus();
                              }
                            },
                          });
                        })(t, e)
                      : "panels" === i.value
                      ? (function (e, t) {
                          t.bind(e, {});
                        })(t, e)
                      : "panel" === i.value &&
                        (function (e, t) {
                          t.bind(e, {
                            ":tabindex"() {
                              return this.$panel.isSelected ? 0 : -1;
                            },
                            "x-data": () => ({
                              init() {
                                (this.__panelEl = this.$el),
                                  this.$data.__addPanel(this.$el);
                              },
                              __panelEl: void 0,
                            }),
                            "x-show"() {
                              return this.$panel.isSelected;
                            },
                          });
                        })(t, e)
                    : (function (e, t) {
                        t.bind(e, {
                          "x-modelable": "__selectedIndex",
                          "x-data": () => ({
                            init() {
                              queueMicrotask(() => {
                                let e =
                                    this.__selectedIndex ||
                                    Number(
                                      t.bound(this.$el, "default-index", 0)
                                    ),
                                  i = this.__activeTabs();
                                var n, r, o;
                                (this.__selectedIndex =
                                  ((n = e),
                                  (r = 0),
                                  (o = i.length - 1),
                                  Math.min(Math.max(n, r), o))),
                                  t.effect(() => {
                                    this.__manualActivation = t.bound(
                                      this.$el,
                                      "manual",
                                      !1
                                    );
                                  });
                              });
                            },
                            __tabs: [],
                            __panels: [],
                            __selectedIndex: null,
                            __tabGroupEl: void 0,
                            __manualActivation: !1,
                            __addTab(e) {
                              this.__tabs.push(e);
                            },
                            __addPanel(e) {
                              this.__panels.push(e);
                            },
                            __selectTab(e) {
                              this.__selectedIndex = this.__tabs.indexOf(e);
                            },
                            __activeTabs() {
                              return this.__tabs.filter((e) => !e.__disabled);
                            },
                          }),
                        });
                      })(t, e);
                })
                .before("bind"),
                e.magic("tab", (t) => {
                  let i = e.$data(t);
                  return {
                    get isSelected() {
                      return i.__selectedIndex === i.__tabs.indexOf(i.__tabEl);
                    },
                    get isDisabled() {
                      return i.__isDisabled;
                    },
                  };
                }),
                e.magic("panel", (t) => {
                  let i = e.$data(t);
                  return {
                    get isSelected() {
                      return (
                        i.__selectedIndex === i.__panels.indexOf(i.__panelEl)
                      );
                    },
                  };
                });
            })(e);
        }),
        An.plugin(function (e) {
          let t, i;
          window.addEventListener("focusin", () => {
            (t = i), (i = document.activeElement);
          }),
            e.magic("focus", (e) => {
              let n = e;
              return {
                __noscroll: !1,
                __wrapAround: !1,
                within(e) {
                  return (n = e), this;
                },
                withoutScrolling() {
                  return (this.__noscroll = !0), this;
                },
                noscroll() {
                  return (this.__noscroll = !0), this;
                },
                withWrapAround() {
                  return (this.__wrapAround = !0), this;
                },
                wrap() {
                  return this.withWrapAround();
                },
                focusable: (e) => S(e),
                previouslyFocused: () => t,
                lastFocused: () => t,
                focused: () => i,
                focusables: () =>
                  Array.isArray(n) ? n : $(n, { displayCheck: "none" }),
                all() {
                  return this.focusables();
                },
                isFirst(e) {
                  let t = this.all();
                  return t[0] && t[0].isSameNode(e);
                },
                isLast(e) {
                  let t = this.all();
                  return t.length && t.slice(-1)[0].isSameNode(e);
                },
                getFirst() {
                  return this.all()[0];
                },
                getLast() {
                  return this.all().slice(-1)[0];
                },
                getNext() {
                  let e = this.all(),
                    t = document.activeElement;
                  if (-1 !== e.indexOf(t))
                    return this.__wrapAround && e.indexOf(t) === e.length - 1
                      ? e[0]
                      : e[e.indexOf(t) + 1];
                },
                getPrevious() {
                  let e = this.all(),
                    t = document.activeElement;
                  if (-1 !== e.indexOf(t))
                    return this.__wrapAround && 0 === e.indexOf(t)
                      ? e.slice(-1)[0]
                      : e[e.indexOf(t) - 1];
                },
                first() {
                  this.focus(this.getFirst());
                },
                last() {
                  this.focus(this.getLast());
                },
                next() {
                  this.focus(this.getNext());
                },
                previous() {
                  this.focus(this.getPrevious());
                },
                prev() {
                  return this.previous();
                },
                focus(e) {
                  e &&
                    setTimeout(() => {
                      e.hasAttribute("tabindex") ||
                        e.setAttribute("tabindex", "0"),
                        e.focus({ preventScroll: this._noscroll });
                    });
                },
              };
            }),
            e.directive(
              "trap",
              e.skipDuringClone(
                (
                  e,
                  { expression: t, modifiers: i },
                  { effect: n, evaluateLater: r, cleanup: o }
                ) => {
                  let a = r(t),
                    s = !1,
                    l = {
                      escapeDeactivates: !1,
                      allowOutsideClick: !0,
                      fallbackFocus: () => e,
                    },
                    u = e.querySelector("[autofocus]");
                  u && (l.initialFocus = u);
                  let c = (function (e, t) {
                      var i,
                        n = (null == t ? void 0 : t.document) || document,
                        r = k(
                          {
                            returnFocusOnDeactivate: !0,
                            escapeDeactivates: !0,
                            delayInitialFocus: !0,
                          },
                          t
                        ),
                        o = {
                          containers: [],
                          containerGroups: [],
                          tabbableGroups: [],
                          nodeFocusedBeforeActivation: null,
                          mostRecentlyFocusedNode: null,
                          active: !1,
                          paused: !1,
                          delayInitialFocusTimer: void 0,
                        },
                        a = function (e, t, i) {
                          return e && void 0 !== e[t] ? e[t] : r[i || t];
                        },
                        s = function (e) {
                          return o.containerGroups.findIndex(function (t) {
                            var i = t.container,
                              n = t.tabbableNodes;
                            return (
                              i.contains(e) ||
                              n.find(function (t) {
                                return t === e;
                              })
                            );
                          });
                        },
                        l = function (e) {
                          var t = r[e];
                          if ("function" == typeof t) {
                            for (
                              var i = arguments.length,
                                o = new Array(i > 1 ? i - 1 : 0),
                                a = 1;
                              a < i;
                              a++
                            )
                              o[a - 1] = arguments[a];
                            t = t.apply(void 0, o);
                          }
                          if ((!0 === t && (t = void 0), !t)) {
                            if (void 0 === t || !1 === t) return t;
                            throw new Error(
                              "`".concat(
                                e,
                                "` was specified but was not a node, or did not return a node"
                              )
                            );
                          }
                          var s = t;
                          if ("string" == typeof t && !(s = n.querySelector(t)))
                            throw new Error(
                              "`".concat(
                                e,
                                "` as selector refers to no known node"
                              )
                            );
                          return s;
                        },
                        u = function () {
                          var e = l("initialFocus");
                          if (!1 === e) return !1;
                          if (void 0 === e)
                            if (s(n.activeElement) >= 0) e = n.activeElement;
                            else {
                              var t = o.tabbableGroups[0];
                              e =
                                (t && t.firstTabbableNode) ||
                                l("fallbackFocus");
                            }
                          if (!e)
                            throw new Error(
                              "Your focus-trap needs to have at least one focusable element"
                            );
                          return e;
                        },
                        c = function () {
                          if (
                            ((o.containerGroups = o.containers.map(function (
                              e
                            ) {
                              var t = w(e, r.tabbableOptions),
                                i = $(e, r.tabbableOptions);
                              return {
                                container: e,
                                tabbableNodes: t,
                                focusableNodes: i,
                                firstTabbableNode: t.length > 0 ? t[0] : null,
                                lastTabbableNode:
                                  t.length > 0 ? t[t.length - 1] : null,
                                nextTabbableNode: function (e) {
                                  var t =
                                      !(
                                        arguments.length > 1 &&
                                        void 0 !== arguments[1]
                                      ) || arguments[1],
                                    n = i.findIndex(function (t) {
                                      return t === e;
                                    });
                                  if (!(n < 0))
                                    return t
                                      ? i.slice(n + 1).find(function (e) {
                                          return O(e, r.tabbableOptions);
                                        })
                                      : i
                                          .slice(0, n)
                                          .reverse()
                                          .find(function (e) {
                                            return O(e, r.tabbableOptions);
                                          });
                                },
                              };
                            })),
                            (o.tabbableGroups = o.containerGroups.filter(
                              function (e) {
                                return e.tabbableNodes.length > 0;
                              }
                            )),
                            o.tabbableGroups.length <= 0 && !l("fallbackFocus"))
                          )
                            throw new Error(
                              "Your focus-trap must have at least one container with at least one tabbable node in it at all times"
                            );
                        },
                        d = function e(t) {
                          !1 !== t &&
                            t !== n.activeElement &&
                            (t && t.focus
                              ? (t.focus({ preventScroll: !!r.preventScroll }),
                                (o.mostRecentlyFocusedNode = t),
                                (function (e) {
                                  return (
                                    e.tagName &&
                                    "input" === e.tagName.toLowerCase() &&
                                    "function" == typeof e.select
                                  );
                                })(t) && t.select())
                              : e(u()));
                        },
                        p = function (e) {
                          var t = l("setReturnFocus", e);
                          return t || (!1 !== t && e);
                        },
                        f = function (e) {
                          var t = P(e);
                          s(t) >= 0 ||
                            (N(r.clickOutsideDeactivates, e)
                              ? i.deactivate({
                                  returnFocus:
                                    r.returnFocusOnDeactivate &&
                                    !S(t, r.tabbableOptions),
                                })
                              : N(r.allowOutsideClick, e) ||
                                e.preventDefault());
                        },
                        h = function (e) {
                          var t = P(e),
                            i = s(t) >= 0;
                          i || t instanceof Document
                            ? i && (o.mostRecentlyFocusedNode = t)
                            : (e.stopImmediatePropagation(),
                              d(o.mostRecentlyFocusedNode || u()));
                        },
                        _ = function (e) {
                          if (
                            (function (e) {
                              return (
                                "Escape" === e.key ||
                                "Esc" === e.key ||
                                27 === e.keyCode
                              );
                            })(e) &&
                            !1 !== N(r.escapeDeactivates, e)
                          )
                            return e.preventDefault(), void i.deactivate();
                          (function (e) {
                            return "Tab" === e.key || 9 === e.keyCode;
                          })(e) &&
                            (function (e) {
                              var t = P(e);
                              c();
                              var i = null;
                              if (o.tabbableGroups.length > 0) {
                                var n = s(t),
                                  a = n >= 0 ? o.containerGroups[n] : void 0;
                                if (n < 0)
                                  i = e.shiftKey
                                    ? o.tabbableGroups[
                                        o.tabbableGroups.length - 1
                                      ].lastTabbableNode
                                    : o.tabbableGroups[0].firstTabbableNode;
                                else if (e.shiftKey) {
                                  var u = I(o.tabbableGroups, function (e) {
                                    var i = e.firstTabbableNode;
                                    return t === i;
                                  });
                                  if (
                                    (u < 0 &&
                                      (a.container === t ||
                                        (S(t, r.tabbableOptions) &&
                                          !O(t, r.tabbableOptions) &&
                                          !a.nextTabbableNode(t, !1))) &&
                                      (u = n),
                                    u >= 0)
                                  ) {
                                    var p =
                                      0 === u
                                        ? o.tabbableGroups.length - 1
                                        : u - 1;
                                    i = o.tabbableGroups[p].lastTabbableNode;
                                  }
                                } else {
                                  var f = I(o.tabbableGroups, function (e) {
                                    var i = e.lastTabbableNode;
                                    return t === i;
                                  });
                                  if (
                                    (f < 0 &&
                                      (a.container === t ||
                                        (S(t, r.tabbableOptions) &&
                                          !O(t, r.tabbableOptions) &&
                                          !a.nextTabbableNode(t))) &&
                                      (f = n),
                                    f >= 0)
                                  ) {
                                    var h =
                                      f === o.tabbableGroups.length - 1
                                        ? 0
                                        : f + 1;
                                    i = o.tabbableGroups[h].firstTabbableNode;
                                  }
                                }
                              } else i = l("fallbackFocus");
                              i && (e.preventDefault(), d(i));
                            })(e);
                        },
                        v = function (e) {
                          var t = P(e);
                          s(t) >= 0 ||
                            N(r.clickOutsideDeactivates, e) ||
                            N(r.allowOutsideClick, e) ||
                            (e.preventDefault(), e.stopImmediatePropagation());
                        },
                        m = function () {
                          if (o.active)
                            return (
                              C.activateTrap(i),
                              (o.delayInitialFocusTimer = r.delayInitialFocus
                                ? T(function () {
                                    d(u());
                                  })
                                : d(u())),
                              n.addEventListener("focusin", h, !0),
                              n.addEventListener("mousedown", f, {
                                capture: !0,
                                passive: !1,
                              }),
                              n.addEventListener("touchstart", f, {
                                capture: !0,
                                passive: !1,
                              }),
                              n.addEventListener("click", v, {
                                capture: !0,
                                passive: !1,
                              }),
                              n.addEventListener("keydown", _, {
                                capture: !0,
                                passive: !1,
                              }),
                              i
                            );
                        },
                        b = function () {
                          if (o.active)
                            return (
                              n.removeEventListener("focusin", h, !0),
                              n.removeEventListener("mousedown", f, !0),
                              n.removeEventListener("touchstart", f, !0),
                              n.removeEventListener("click", v, !0),
                              n.removeEventListener("keydown", _, !0),
                              i
                            );
                        };
                      return (
                        (i = {
                          get active() {
                            return o.active;
                          },
                          get paused() {
                            return o.paused;
                          },
                          activate: function (e) {
                            if (o.active) return this;
                            var t = a(e, "onActivate"),
                              i = a(e, "onPostActivate"),
                              r = a(e, "checkCanFocusTrap");
                            r || c(),
                              (o.active = !0),
                              (o.paused = !1),
                              (o.nodeFocusedBeforeActivation = n.activeElement),
                              t && t();
                            var s = function () {
                              r && c(), m(), i && i();
                            };
                            return r
                              ? (r(o.containers.concat()).then(s, s), this)
                              : (s(), this);
                          },
                          deactivate: function (e) {
                            if (!o.active) return this;
                            var t = k(
                              {
                                onDeactivate: r.onDeactivate,
                                onPostDeactivate: r.onPostDeactivate,
                                checkCanReturnFocus: r.checkCanReturnFocus,
                              },
                              e
                            );
                            clearTimeout(o.delayInitialFocusTimer),
                              (o.delayInitialFocusTimer = void 0),
                              b(),
                              (o.active = !1),
                              (o.paused = !1),
                              C.deactivateTrap(i);
                            var n = a(t, "onDeactivate"),
                              s = a(t, "onPostDeactivate"),
                              l = a(t, "checkCanReturnFocus"),
                              u = a(
                                t,
                                "returnFocus",
                                "returnFocusOnDeactivate"
                              );
                            n && n();
                            var c = function () {
                              T(function () {
                                u && d(p(o.nodeFocusedBeforeActivation)),
                                  s && s();
                              });
                            };
                            return u && l
                              ? (l(p(o.nodeFocusedBeforeActivation)).then(c, c),
                                this)
                              : (c(), this);
                          },
                          pause: function () {
                            return (
                              o.paused || !o.active || ((o.paused = !0), b()),
                              this
                            );
                          },
                          unpause: function () {
                            return o.paused && o.active
                              ? ((o.paused = !1), c(), m(), this)
                              : this;
                          },
                          updateContainerElements: function (e) {
                            var t = [].concat(e).filter(Boolean);
                            return (
                              (o.containers = t.map(function (e) {
                                return "string" == typeof e
                                  ? n.querySelector(e)
                                  : e;
                              })),
                              o.active && c(),
                              this
                            );
                          },
                        }).updateContainerElements(e),
                        i
                      );
                    })(e, l),
                    d = () => {},
                    p = () => {};
                  const f = () => {
                    d(),
                      (d = () => {}),
                      p(),
                      (p = () => {}),
                      c.deactivate({ returnFocus: !i.includes("noreturn") });
                  };
                  n(() =>
                    a((t) => {
                      s !== t &&
                        (t &&
                          !s &&
                          setTimeout(() => {
                            i.includes("inert") && (d = j(e)),
                              i.includes("noscroll") &&
                                (p = (function () {
                                  let e =
                                      document.documentElement.style.overflow,
                                    t =
                                      document.documentElement.style
                                        .paddingRight,
                                    i =
                                      window.innerWidth -
                                      document.documentElement.clientWidth;
                                  return (
                                    (document.documentElement.style.overflow =
                                      "hidden"),
                                    (document.documentElement.style.paddingRight = `${i}px`),
                                    () => {
                                      (document.documentElement.style.overflow =
                                        e),
                                        (document.documentElement.style.paddingRight =
                                          t);
                                    }
                                  );
                                })()),
                              c.activate();
                          }),
                        !t && s && f(),
                        (s = !!t));
                    })
                  ),
                    o(f);
                },
                (e, { expression: t, modifiers: i }, { evaluate: n }) => {
                  i.includes("inert") && n(t) && j(e);
                }
              )
            );
        }),
        An.plugin(function (e) {
          function t(t, { modifiers: i }) {
            let n = K(i, "duration", 250) / 1e3,
              r = K(i, "min", 0),
              o = !i.includes("min");
            t._x_isShown || (t.style.height = `${r}px`),
              !t._x_isShown && o && (t.hidden = !0),
              t._x_isShown || (t.style.overflow = "hidden");
            let a = (t, i) => {
                let n = e.setStyles(t, i);
                return i.height ? () => {} : n;
              },
              s = {
                transitionProperty: "height",
                transitionDuration: `${n}s`,
                transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
              };
            t._x_transition = {
              in(i = () => {}, n = () => {}) {
                o && (t.hidden = !1), o && (t.style.display = null);
                let a = t.getBoundingClientRect().height;
                t.style.height = "auto";
                let l = t.getBoundingClientRect().height;
                a === l && (a = r),
                  e.transition(
                    t,
                    e.setStyles,
                    {
                      during: s,
                      start: { height: a + "px" },
                      end: { height: l + "px" },
                    },
                    () => (t._x_isShown = !0),
                    () => {
                      t.getBoundingClientRect().height == l &&
                        (t.style.overflow = null);
                    }
                  );
              },
              out(i = () => {}, n = () => {}) {
                let l = t.getBoundingClientRect().height;
                e.transition(
                  t,
                  a,
                  {
                    during: s,
                    start: { height: l + "px" },
                    end: { height: r + "px" },
                  },
                  () => (t.style.overflow = "hidden"),
                  () => {
                    (t._x_isShown = !1),
                      t.style.height == `${r}px` &&
                        o &&
                        ((t.style.display = "none"), (t.hidden = !0));
                  }
                );
              },
            };
          }
          e.directive("collapse", t),
            (t.inline = (e, { modifiers: t }) => {
              t.includes("min") &&
                ((e._x_doShow = () => {}), (e._x_doHide = () => {}));
            });
        }),
        An.plugin(Mn),
        (window.Alpine = An),
        i(529),
        i(599),
        i(395),
        i(847),
        i(853),
        i(578),
        i(837),
        i(150),
        i(295),
        (window.strawpoll = Mo);
      const Go = i(386);
      i(297), i(88), i(531), i(954), i(178);
      var Qo = i(566);
      Go.extend(Qo);
      var Xo = i(957),
        ea = i(570);
      Go.extend(Xo),
        Go.extend(ea),
        Lo("de", Uo.Z),
        Lo("fr", qo.Z),
        Lo("es", Zo.Z),
        Lo("pt", Jo.Z),
        (window.timeago = e),
        (window.dayjs = Go),
        (window.Components = {}),
        (window.Components.listbox = function (e) {
          return {
            init() {
              if (e.preselect)
                for (let t = 0; t < this.$refs.listbox.children.length; t++)
                  e.preselect ===
                    this.$refs.listbox.children[t].dataset.value &&
                    ((this.activeIndex = t), (this.selectedIndex = t));
              (this.optionCount = this.$refs.listbox.children.length),
                this.$watch("activeIndex", (e) => {
                  this.open &&
                    (null !== this.activeIndex
                      ? (this.activeDescendant =
                          this.$refs.listbox.children[this.activeIndex].id)
                      : (this.activeDescendant = ""));
                });
            },
            activeDescendant: null,
            optionCount: null,
            open: !1,
            activeIndex: null,
            selectedIndex: 0,
            get active() {
              return this.items[this.activeIndex];
            },
            get [e.modelName || "selected"]() {
              return this.items[this.selectedIndex];
            },
            choose(e) {
              (this.selectedIndex = e),
                (this.open = !1),
                this.$dispatch(
                  "listbox-update",
                  this.items[this.selectedIndex].value
                );
            },
            onButtonClick() {
              this.open ||
                ((this.activeIndex = this.selectedIndex),
                (this.open = !0),
                this.$nextTick(() => {
                  this.$refs.listbox.focus(),
                    this.$refs.listbox.children[
                      this.activeIndex
                    ].scrollIntoView({ block: "nearest" });
                }));
            },
            onOptionSelect() {
              null !== this.activeIndex &&
                (this.selectedIndex = this.activeIndex),
                (this.open = !1),
                this.$refs.button.focus(),
                this.$dispatch(
                  "listbox-update",
                  this.items[this.selectedIndex].value
                );
            },
            onEscape() {
              (this.open = !1), this.$refs.button.focus();
            },
            onArrowUp() {
              (this.activeIndex =
                this.activeIndex - 1 < 0
                  ? this.optionCount - 1
                  : this.activeIndex - 1),
                this.$refs.listbox.children[this.activeIndex].scrollIntoView({
                  block: "nearest",
                });
            },
            onArrowDown() {
              (this.activeIndex =
                this.activeIndex + 1 > this.optionCount - 1
                  ? 0
                  : this.activeIndex + 1),
                this.$refs.listbox.children[this.activeIndex].scrollIntoView({
                  block: "nearest",
                });
            },
            ...e,
          };
        }),
        (window.Components.menu = function (e = { open: !1 }) {
          return {
            init() {
              (this.items = Array.from(
                this.$el.querySelectorAll('[role="menuitem"]')
              )),
                this.$watch("open", () => {
                  this.open && (this.activeIndex = -1);
                });
            },
            activeDescendant: null,
            activeIndex: null,
            items: null,
            open: e.open,
            focusButton() {
              this.$refs.button.focus();
            },
            onButtonClick() {
              (this.open = !this.open),
                this.open &&
                  this.$nextTick(() => {
                    this.$refs["menu-items"].focus();
                  });
            },
            onButtonEnter() {
              (this.open = !this.open),
                this.open &&
                  ((this.activeIndex = 0),
                  (this.activeDescendant = this.items[this.activeIndex].id),
                  this.$nextTick(() => {
                    this.$refs["menu-items"].focus();
                  }));
            },
            onArrowUp() {
              if (!this.open)
                return (
                  (this.open = !0),
                  (this.activeIndex = this.items.length - 1),
                  void (this.activeDescendant = this.items[this.activeIndex].id)
                );
              0 !== this.activeIndex &&
                ((this.activeIndex =
                  -1 === this.activeIndex
                    ? this.items.length - 1
                    : this.activeIndex - 1),
                (this.activeDescendant = this.items[this.activeIndex].id));
            },
            onArrowDown() {
              if (!this.open)
                return (
                  (this.open = !0),
                  (this.activeIndex = 0),
                  void (this.activeDescendant = this.items[this.activeIndex].id)
                );
              this.activeIndex !== this.items.length - 1 &&
                ((this.activeIndex = this.activeIndex + 1),
                (this.activeDescendant = this.items[this.activeIndex].id));
            },
            onClickAway(e) {
              if (this.open) {
                const t = [
                  "[contentEditable=true]",
                  "[tabindex]",
                  "a[href]",
                  "area[href]",
                  "button:not([disabled])",
                  "iframe",
                  "input:not([disabled])",
                  "select:not([disabled])",
                  "textarea:not([disabled])",
                ]
                  .map((e) => `${e}:not([tabindex='-1'])`)
                  .join(",");
                (this.open = !1), e.target.closest(t) || this.focusButton();
              }
            },
          };
        }),
        (window.Components.popoverGroup = function () {
          return {
            __type: "popoverGroup",
            init() {
              let e = (t) => {
                document.body.contains(this.$el)
                  ? t.target instanceof Element &&
                    !this.$el.contains(t.target) &&
                    window.dispatchEvent(
                      new CustomEvent("close-popover-group", {
                        detail: this.$el,
                      })
                    )
                  : window.removeEventListener("focus", e, !0);
              };
              window.addEventListener("focus", e, !0);
            },
          };
        }),
        (window.Components.popover = function ({
          open: e = !1,
          focus: t = !1,
        } = {}) {
          const i = [
            "[contentEditable=true]",
            "[tabindex]",
            "a[href]",
            "area[href]",
            "button:not([disabled])",
            "iframe",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
          ]
            .map((e) => `${e}:not([tabindex='-1'])`)
            .join(",");
          return {
            __type: "popover",
            open: e,
            init() {
              t &&
                this.$watch("open", (e) => {
                  e &&
                    this.$nextTick(() => {
                      !(function (e) {
                        const t = Array.from(e.querySelectorAll(i));
                        !(function e(i) {
                          void 0 !== i &&
                            (i.focus({ preventScroll: !0 }),
                            document.activeElement !== i &&
                              e(t[t.indexOf(i) + 1]));
                        })(t[0]);
                      })(this.$refs.panel);
                    });
                });
              let e = (i) => {
                if (!document.body.contains(this.$el))
                  return void window.removeEventListener("focus", e, !0);
                let n = t ? this.$refs.panel : this.$el;
                if (
                  this.open &&
                  i.target instanceof Element &&
                  !n.contains(i.target)
                ) {
                  let e = this.$el;
                  for (; e.parentNode; )
                    if (
                      ((e = e.parentNode), e.__x instanceof this.constructor)
                    ) {
                      if ("popoverGroup" === e.__x.$data.__type) return;
                      if ("popover" === e.__x.$data.__type) break;
                    }
                  this.open = !1;
                }
              };
              window.addEventListener("focus", e, !0);
            },
            onEscape() {
              (this.open = !1), this.restoreEl && this.restoreEl.focus();
            },
            onClosePopoverGroup(e) {
              e.detail.contains(this.$el) && (this.open = !1);
            },
            toggle(e) {
              (this.open = !this.open),
                this.open
                  ? (this.restoreEl = e.currentTarget)
                  : this.restoreEl && this.restoreEl.focus();
            },
          };
        }),
        (window.Components.tabs = function () {
          return {
            selectedIndex: 0,
            onTabClick(e) {
              if (!this.$el.contains(e.detail)) return;
              let t = Array.from(
                  this.$el.querySelectorAll('[x-data^="Components.tab("]')
                ),
                i = Array.from(
                  this.$el.querySelectorAll('[x-data^="Components.tabPanel("]')
                ),
                n = t.indexOf(e.detail);
              (this.selectedIndex = n),
                window.dispatchEvent(
                  new CustomEvent("tab-select", {
                    detail: { tab: e.detail, panel: i[n] },
                  })
                );
            },
            onTabKeydown(e) {
              if (!this.$el.contains(e.detail.tab)) return;
              let t = Array.from(
                  this.$el.querySelectorAll('[x-data^="Components.tab("]')
                ),
                i = t.indexOf(e.detail.tab);
              "ArrowLeft" === e.detail.key
                ? this.onTabClick({ detail: t[(i - 1 + t.length) % t.length] })
                : "ArrowRight" === e.detail.key
                ? this.onTabClick({ detail: t[(i + 1) % t.length] })
                : "Home" === e.detail.key || "PageUp" === e.detail.key
                ? this.onTabClick({ detail: t[0] })
                : ("End" !== e.detail.key && "PageDown" !== e.detail.key) ||
                  this.onTabClick({ detail: t[t.length - 1] });
            },
          };
        }),
        (window.Components.tab = function (e = 0) {
          return {
            selected: !1,
            init() {
              let t = Array.from(
                this.$el
                  .closest('[x-data^="Components.tabs("]')
                  .querySelectorAll('[x-data^="Components.tab("]')
              );
              (this.selected = t.indexOf(this.$el) === e),
                this.$watch("selected", (e) => {
                  e && this.$el.focus();
                });
            },
            onClick() {
              window.dispatchEvent(
                new CustomEvent("tab-click", { detail: this.$el })
              );
            },
            onKeydown(e) {
              [
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "PageUp",
                "End",
                "PageDown",
              ].includes(e.key) && e.preventDefault(),
                window.dispatchEvent(
                  new CustomEvent("tab-keydown", {
                    detail: { tab: this.$el, key: e.key },
                  })
                );
            },
            onTabSelect(e) {
              this.selected = e.detail.tab === this.$el;
            },
          };
        }),
        (window.Components.tabPanel = function (e = 0) {
          return {
            selected: !1,
            init() {
              let t = Array.from(
                this.$el
                  .closest('[x-data^="Components.tabs("]')
                  .querySelectorAll('[x-data^="Components.tabPanel("]')
              );
              this.selected = t.indexOf(this.$el) === e;
            },
            onTabSelect(e) {
              this.selected = e.detail.panel === this.$el;
            },
          };
        }),
        An.start();
    })();
})();
